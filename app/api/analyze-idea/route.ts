import { NextResponse } from "next/server";
import { buildAnalyzeIdeaPrompt } from "@/lib/ai-prompts";
import {
  detectProjectDomain,
  getDynamicQuestionChips,
  getDynamicQuestions,
  isProjectDomain,
  type ProjectDomain,
} from "@/lib/generate-prd";
import type { AppLanguage } from "@/lib/i18n";
import { callOpenRouter, hasOpenRouterConfig } from "@/lib/openrouter";

type ApiMode = "local" | "economy" | "full";

type AnalyzeRequest = {
  idea?: string;
  language?: AppLanguage;
  apiMode?: ApiMode;
};

type AiQuestion = {
  question: string;
  chips?: string[];
  options?: string[];
};

type AiAnalyzeResponse = {
  domain?: ProjectDomain;
  confidence?: number;
  summary?: string;
  questions?: AiQuestion[];
};

function fallbackAnalyze(idea: string, language: AppLanguage, reason?: string) {
  const domain = detectProjectDomain(idea);

  return {
    source: "local-fallback",
    fallback: Boolean(reason),
    reason,
    domain,
    confidence: 0.72,
    summary:
      language === "id"
        ? "Analisis lokal digunakan untuk mendeteksi domain dan membuat pertanyaan klarifikasi."
        : "Local analysis was used to detect the domain and create clarification questions.",
    questions: getDynamicQuestions(domain, language).map((question, index) => ({
      question,
      chips: getDynamicQuestionChips(domain, language)[index] || [],
    })),
  };
}

function safeParseJson(text: string): AiAnalyzeResponse {
  const cleaned = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
  return JSON.parse(cleaned) as AiAnalyzeResponse;
}

const englishQuestionPatterns = [
  /who are/i,
  /what are/i,
  /how do/i,
  /which features/i,
  /primary users/i,
  /target users/i,
  /what is/i,
  /which/i,
  /how should/i,
  /do you need/i,
  /\bpersonal\b/i,
  /\bbusiness\b/i,
  /\bfamily\b/i,
  /\bincome\b/i,
  /\bexpense\b/i,
  /\bmonthly chart\b/i,
  /\bexport report\b/i,
  /\bsingle admin\b/i,
  /\bmultiple admin/i,
  /\bsmall store\b/i,
  /\bwarehouse\b/i,
];

const indonesianQuestionPatterns = [
  /\bapakah\b/i,
  /\bsiapa\b/i,
  /\bapa\b/i,
  /\bbagaimana\b/i,
  /\bfitur\b/i,
  /\bpengguna\b/i,
  /\bdibutuhkan\b/i,
  /\bperlu\b/i,
];

function hasEnglishUserFacingText(value: string) {
  return englishQuestionPatterns.some((pattern) => pattern.test(value));
}

function hasIndonesianUserFacingText(value: string) {
  return indonesianQuestionPatterns.some((pattern) => pattern.test(value));
}

function normalizeQuestions(questions: AiQuestion[]) {
  return questions.map((item) => ({
    question: item.question,
    chips: item.chips || item.options || [],
  }));
}

function shouldUseQuestionFallback(questions: AiQuestion[] | undefined, language: AppLanguage) {
  if (!questions || questions.length !== 5) return true;

  const normalized = normalizeQuestions(questions);
  return normalized.some((item) => {
    const chipText = item.chips.join(" ");
    if (language === "id") {
      return hasEnglishUserFacingText(item.question) || hasEnglishUserFacingText(chipText);
    }
    return hasIndonesianUserFacingText(item.question) || hasIndonesianUserFacingText(chipText);
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnalyzeRequest;
    const idea = body.idea?.trim();
    const language: AppLanguage = body.language === "en" ? "en" : "id";
    const apiMode: ApiMode =
      body.apiMode === "local" || body.apiMode === "full" || body.apiMode === "economy"
        ? body.apiMode
        : "economy";

    if (!idea) {
      return NextResponse.json(
        { error: language === "id" ? "Ide aplikasi wajib diisi." : "Application idea is required." },
        { status: 400 },
      );
    }

    const localDomain = detectProjectDomain(idea);
    const fallbackQuestions = getDynamicQuestions(localDomain, language);

    if (apiMode === "local" || !hasOpenRouterConfig()) {
      return NextResponse.json(
        {
          ...fallbackAnalyze(
            idea,
            language,
            apiMode === "local"
              ? language === "id"
                ? "Mode lokal aktif. OpenRouter tidak dipanggil."
                : "Local mode is active. OpenRouter was not called."
              : language === "id"
                ? "OPENROUTER_API_KEY belum dikonfigurasi."
                : "OPENROUTER_API_KEY is not configured.",
          ),
          source: "local-fallback",
        },
      );
    }

    try {
      const content = await callOpenRouter({
        temperature: 0.2,
        maxTokens: apiMode === "full" ? 900 : 700,
        model: process.env.OPENROUTER_ANALYZE_MODEL || "google/gemini-2.0-flash-lite-001",
        messages: [
          {
            role: "system",
            content:
              language === "id"
                ? "Return strict JSON for product discovery. No markdown. All user-facing text must be in Bahasa Indonesia."
                : "Return strict JSON for product discovery. No markdown. All user-facing text must be in English.",
          },
          {
            role: "user",
            content: buildAnalyzeIdeaPrompt({ idea, detectedDomain: localDomain, fallbackQuestions, language }),
          },
        ],
      });

      const parsed = safeParseJson(content);
      const domain = isProjectDomain(parsed.domain) ? parsed.domain : localDomain;
      const fallback = fallbackAnalyze(idea, language);
      const questions = shouldUseQuestionFallback(parsed.questions, language)
        ? fallback.questions
        : normalizeQuestions(parsed.questions || []);

      return NextResponse.json({
        source: questions === fallback.questions ? "local-fallback" : "openrouter",
        fallback: questions === fallback.questions,
        reason:
          questions === fallback.questions
            ? language === "id"
              ? "Pertanyaan OpenRouter terdeteksi tidak sepenuhnya berbahasa Indonesia."
              : "OpenRouter questions were not fully written in English."
            : undefined,
        domain,
        confidence: parsed.confidence ?? 0.85,
        summary: parsed.summary || fallback.summary,
        questions,
      });
    } catch (error) {
      const message =
        language === "id"
          ? "Request OpenRouter gagal. Pertanyaan lokal digunakan."
          : "OpenRouter request failed. Local questions were used.";
      return NextResponse.json({ ...fallbackAnalyze(idea, language, message), source: "local-fallback" });
    }
  } catch {
    return NextResponse.json({ error: "Request JSON tidak valid." }, { status: 400 });
  }
}

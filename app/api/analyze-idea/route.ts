import { NextResponse } from "next/server";
import { buildAnalyzeIdeaPrompt } from "@/lib/ai-prompts";
import {
  detectProjectDomain,
  getDynamicQuestionChips,
  getDynamicQuestions,
  type ProjectDomain,
} from "@/lib/generate-prd";
import { callOpenRouter, hasOpenRouterConfig } from "@/lib/openrouter";

type AnalyzeRequest = {
  idea?: string;
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

function fallbackAnalyze(idea: string, reason?: string) {
  const domain = detectProjectDomain(idea);

  return {
    source: "local",
    fallback: Boolean(reason),
    reason,
    domain,
    confidence: 0.72,
    summary: "Analisis lokal digunakan untuk mendeteksi domain dan membuat pertanyaan klarifikasi.",
    questions: getDynamicQuestions(domain).map((question, index) => ({
      question,
      chips: getDynamicQuestionChips(domain)[index] || [],
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

function hasEnglishUserFacingText(value: string) {
  return englishQuestionPatterns.some((pattern) => pattern.test(value));
}

function normalizeQuestions(questions: AiQuestion[]) {
  return questions.map((item) => ({
    question: item.question,
    chips: item.chips || item.options || [],
  }));
}

function shouldUseQuestionFallback(questions: AiQuestion[] | undefined) {
  if (!questions || questions.length !== 5) return true;

  const normalized = normalizeQuestions(questions);
  return normalized.some((item) => {
    const chipText = item.chips.join(" ");
    return hasEnglishUserFacingText(item.question) || hasEnglishUserFacingText(chipText);
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnalyzeRequest;
    const idea = body.idea?.trim();

    if (!idea) {
      return NextResponse.json({ error: "Ide aplikasi wajib diisi." }, { status: 400 });
    }

    const localDomain = detectProjectDomain(idea);
    const fallbackQuestions = getDynamicQuestions(localDomain);

    if (!hasOpenRouterConfig()) {
      return NextResponse.json(fallbackAnalyze(idea, "OPENROUTER_API_KEY belum dikonfigurasi."));
    }

    try {
      const content = await callOpenRouter({
        temperature: 0.2,
        maxTokens: 1200,
        messages: [
          {
            role: "system",
            content:
              "Return strict JSON for product discovery. No markdown. All user-facing text must be in Bahasa Indonesia.",
          },
          {
            role: "user",
            content: buildAnalyzeIdeaPrompt({ idea, detectedDomain: localDomain, fallbackQuestions }),
          },
        ],
      });

      const parsed = safeParseJson(content);
      const domain = parsed.domain || localDomain;
      const fallback = fallbackAnalyze(idea);
      const questions = shouldUseQuestionFallback(parsed.questions)
        ? fallback.questions
        : normalizeQuestions(parsed.questions || []);

      return NextResponse.json({
        source: "openrouter",
        fallback: questions === fallback.questions,
        reason: questions === fallback.questions ? "Pertanyaan OpenRouter terdeteksi tidak sepenuhnya berbahasa Indonesia." : undefined,
        domain,
        confidence: parsed.confidence ?? 0.85,
        summary: parsed.summary || fallback.summary,
        questions,
      });
    } catch (error) {
      const message = error instanceof Error && error.message ? "Request OpenRouter gagal. Pertanyaan lokal digunakan." : "Analisis OpenRouter gagal. Pertanyaan lokal digunakan.";
      return NextResponse.json(fallbackAnalyze(idea, message));
    }
  } catch {
    return NextResponse.json({ error: "Request JSON tidak valid." }, { status: 400 });
  }
}

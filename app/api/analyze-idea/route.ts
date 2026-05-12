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
  chips: string[];
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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnalyzeRequest;
    const idea = body.idea?.trim();

    if (!idea) {
      return NextResponse.json({ error: "Idea is required." }, { status: 400 });
    }

    const localDomain = detectProjectDomain(idea);
    const fallbackQuestions = getDynamicQuestions(localDomain);

    if (!hasOpenRouterConfig()) {
      return NextResponse.json(fallbackAnalyze(idea, "OPENROUTER_API_KEY is not configured."));
    }

    try {
      const content = await callOpenRouter({
        temperature: 0.2,
        maxTokens: 1200,
        messages: [
          {
            role: "system",
            content: "You return strict JSON for product discovery. No markdown.",
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
      const questions = parsed.questions?.length === 5 ? parsed.questions : fallback.questions;

      return NextResponse.json({
        source: "openrouter",
        fallback: false,
        domain,
        confidence: parsed.confidence ?? 0.85,
        summary: parsed.summary || fallback.summary,
        questions,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "OpenRouter analyze request failed.";
      return NextResponse.json(fallbackAnalyze(idea, message));
    }
  } catch {
    return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 });
  }
}

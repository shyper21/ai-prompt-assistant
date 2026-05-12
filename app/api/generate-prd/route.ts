import { NextResponse } from "next/server";
import { buildGeneratePrdPrompt } from "@/lib/ai-prompts";
import { detectProjectDomain, generatePRD, isProjectDomain, type GeneratePRDInput } from "@/lib/generate-prd";
import type { AppLanguage } from "@/lib/i18n";
import { callOpenRouter, hasOpenRouterConfig } from "@/lib/openrouter";

type ApiMode = "local" | "economy" | "full";

function isValidInput(value: Partial<GeneratePRDInput>): value is GeneratePRDInput {
  return (
    typeof value.idea === "string" &&
    (value.techMode === "ai" || value.techMode === "manual") &&
    typeof value.selectedTech === "object" &&
    value.selectedTech !== null &&
    Array.isArray(value.answers)
  );
}

const englishBodyPatterns = [
  /the application should/i,
  /the user can/i,
  /users can/i,
  /this feature/i,
  /the system will/i,
  /must be able to/i,
  /primary users/i,
  /target users/i,
  /business goal/i,
  /key feature/i,
];

function prdBodyHasEnglishSentences(markdown: string) {
  const marker = "## 10. Prompt untuk AI Coding Agent";
  const body = markdown.slice(0, markdown.indexOf(marker) === -1 ? markdown.length : markdown.indexOf(marker));
  return englishBodyPatterns.some((pattern) => pattern.test(body));
}

const indonesianBodyPatterns = [
  /\badalah\b/i,
  /\bpengguna\b/i,
  /\baplikasi\b/i,
  /\bfitur\b/i,
  /\bdata utama\b/i,
  /\bwajib\b/i,
  /\bdibutuhkan\b/i,
];

function prdBodyHasIndonesianSentences(markdown: string) {
  return indonesianBodyPatterns.some((pattern) => pattern.test(markdown));
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<GeneratePRDInput>;
    const language: AppLanguage = body.language === "en" ? "en" : "id";
    const apiMode: ApiMode =
      body.apiMode === "local" || body.apiMode === "full" || body.apiMode === "economy"
        ? body.apiMode
        : "economy";

    if (!isValidInput(body) || !body.idea.trim()) {
      return NextResponse.json(
        { error: language === "id" ? "Input generate PRD tidak valid." : "Invalid PRD generation input." },
        { status: 400 },
      );
    }

    const safeInput: GeneratePRDInput = {
      ...body,
      language,
      domain: isProjectDomain(body.domain) ? body.domain : detectProjectDomain(body.idea),
    };
    const localPrd = generatePRD(safeInput);

    if (apiMode === "local" || !hasOpenRouterConfig()) {
      return NextResponse.json({
        source: "local-fallback",
        fallback: true,
        reason:
          apiMode === "local"
            ? language === "id"
              ? "Mode lokal aktif. OpenRouter tidak dipanggil."
              : "Local mode is active. OpenRouter was not called."
            : language === "id"
              ? "OPENROUTER_API_KEY belum dikonfigurasi. Generator lokal digunakan."
              : "OPENROUTER_API_KEY is not configured. Local generator was used.",
        prd: localPrd,
      });
    }

    try {
      const prd = await callOpenRouter({
        temperature: 0.35,
        maxTokens: apiMode === "full" ? 5500 : 2800,
        model: process.env.OPENROUTER_GENERATE_MODEL || "google/gemini-2.0-flash-001",
        messages: [
          {
            role: "system",
            content:
              language === "id"
                ? "You are a senior product manager and full-stack architect. Output complete Markdown PRDs only. User selected Bahasa Indonesia. All PRD content must be written in Bahasa Indonesia. Do not mix English and Indonesian. Only the final AI Coding Agent prompt may be written in English."
                : "You are a senior product manager and full-stack architect. Output complete Markdown PRDs only. User selected English. All PRD content must be written in English. Do not use Indonesian sentences.",
          },
          {
            role: "user",
            content: buildGeneratePrdPrompt(safeInput, localPrd),
          },
        ],
      });

      if (language === "id" && prdBodyHasEnglishSentences(prd)) {
        return NextResponse.json({
          source: "local-fallback",
          fallback: true,
          reason: "Output OpenRouter terdeteksi mencampur kalimat Bahasa Inggris di luar prompt akhir. Generator lokal digunakan.",
          prd: localPrd,
        });
      }

      if (language === "en" && prdBodyHasIndonesianSentences(prd)) {
        return NextResponse.json({
          source: "local-fallback",
          fallback: true,
          reason: "OpenRouter output mixed Indonesian text into the English PRD. Local generator was used.",
          prd: localPrd,
        });
      }

      return NextResponse.json({
        source: "openrouter",
        fallback: false,
        prd,
      });
    } catch (error) {
      return NextResponse.json({
        source: "local-fallback",
        fallback: true,
        reason:
          language === "id"
            ? "Request OpenRouter gagal. Generator lokal digunakan."
            : "OpenRouter request failed. Local generator was used.",
        prd: localPrd,
      });
    }
  } catch {
    return NextResponse.json({ error: "Request JSON tidak valid." }, { status: 400 });
  }
}

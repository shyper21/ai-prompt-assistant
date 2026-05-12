import { NextResponse } from "next/server";
import { buildGeneratePrdPrompt } from "@/lib/ai-prompts";
import { generatePRD, type GeneratePRDInput } from "@/lib/generate-prd";
import { callOpenRouter, hasOpenRouterConfig } from "@/lib/openrouter";

function isValidInput(value: Partial<GeneratePRDInput>): value is GeneratePRDInput {
  return (
    typeof value.idea === "string" &&
    (value.techMode === "ai" || value.techMode === "manual") &&
    typeof value.selectedTech === "object" &&
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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<GeneratePRDInput>;

    if (!isValidInput(body) || !body.idea.trim()) {
      return NextResponse.json({ error: "Input generate PRD tidak valid." }, { status: 400 });
    }

    const localPrd = generatePRD(body);

    if (!hasOpenRouterConfig()) {
      return NextResponse.json({
        source: "local",
        fallback: true,
        reason: "OPENROUTER_API_KEY belum dikonfigurasi. Generator lokal digunakan.",
        prd: localPrd,
      });
    }

    try {
      const prd = await callOpenRouter({
        temperature: 0.35,
        maxTokens: 9000,
        messages: [
          {
            role: "system",
            content:
              "You are a senior product manager and full-stack architect. Output complete Markdown PRDs only. Write all PRD content in Bahasa Indonesia, except the final AI Coding Agent prompt, which may be in English.",
          },
          {
            role: "user",
            content: buildGeneratePrdPrompt(body, localPrd),
          },
        ],
      });

      if (prdBodyHasEnglishSentences(prd)) {
        return NextResponse.json({
          source: "local",
          fallback: true,
          reason: "Output OpenRouter terdeteksi mencampur kalimat Bahasa Inggris di luar prompt akhir. Generator lokal digunakan.",
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
        source: "local",
        fallback: true,
        reason: "Request OpenRouter gagal. Generator lokal digunakan.",
        prd: localPrd,
      });
    }
    } catch {
    return NextResponse.json({ error: "Request JSON tidak valid." }, { status: 400 });
  }
}

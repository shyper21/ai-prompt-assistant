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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<GeneratePRDInput>;

    if (!isValidInput(body) || !body.idea.trim()) {
      return NextResponse.json({ error: "Invalid PRD generation input." }, { status: 400 });
    }

    const localPrd = generatePRD(body);

    if (!hasOpenRouterConfig()) {
      return NextResponse.json({
        source: "local",
        fallback: true,
        reason: "OPENROUTER_API_KEY is not configured. Local generator was used.",
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
              "You are a senior product manager and full-stack architect. Output complete Markdown PRDs only.",
          },
          {
            role: "user",
            content: buildGeneratePrdPrompt(body, localPrd),
          },
        ],
      });

      return NextResponse.json({
        source: "openrouter",
        fallback: false,
        prd,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "OpenRouter PRD generation failed.";
      return NextResponse.json({
        source: "local",
        fallback: true,
        reason: message,
        prd: localPrd,
      });
    }
  } catch {
    return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 });
  }
}

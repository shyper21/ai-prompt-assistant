import type { GeneratePRDInput, ProjectDomain } from "@/lib/generate-prd";

export const USER_LANGUAGE = "Bahasa Indonesia";

export type AnalyzePromptInput = {
  idea: string;
  detectedDomain: ProjectDomain;
  fallbackQuestions: string[];
};

export function buildAnalyzeIdeaPrompt({ idea, detectedDomain, fallbackQuestions }: AnalyzePromptInput) {
  return `You are a senior product analyst helping a non-technical Indonesian user create a precise PRD.

Analyze the product idea and return ONLY valid JSON. Do not wrap in markdown.
Return all user-facing text in ${USER_LANGUAGE}. Questions and options must be in ${USER_LANGUAGE}.
The domain slug may remain in English, but summary, question, chips, and any description shown to users must be in ${USER_LANGUAGE}.

Product idea:
${idea}

Local detected domain:
${detectedDomain}

Fallback questions in Bahasa Indonesia:
${fallbackQuestions.map((question, index) => `${index + 1}. ${question}`).join("\n")}

Return this JSON shape:
{
  "domain": "finance-tracker | inventory | booking-system | learning-app | crm-sales | task-management | content-management | e-commerce | saas-dashboard | generic-web-app",
  "confidence": 0.0,
  "summary": "ringkasan singkat dalam Bahasa Indonesia",
  "questions": [
    {
      "question": "pertanyaan klarifikasi dalam Bahasa Indonesia",
      "chips": ["pilihan singkat", "pilihan singkat", "pilihan singkat"]
    }
  ]
}

Rules:
- Return exactly 5 questions.
- Questions must be specific to the domain and product idea, but written in ${USER_LANGUAGE}.
- Chips must be concise, useful for quick answers, and written in ${USER_LANGUAGE}.
- Do not write English questions like "Who are", "What are", "How do", "Which features", or "primary users".
- If the idea is ambiguous, keep the local detected domain unless another domain is clearly better.`;
}

export function buildGeneratePrdPrompt(input: GeneratePRDInput, localDraft: string) {
  const answeredContext = input.answers
    .filter((answer) => answer.answer.trim())
    .map((answer, index) => `${index + 1}. ${answer.question}\nJawaban: ${answer.answer}`)
    .join("\n\n");

  return `You are a senior product manager and full-stack architect.

Generate a complete, professional PRD in Markdown for an AI coding agent. The document must be long, structured, specific, and directly copy-pasteable into Codex, Claude Code, ChatGPT, Gemini, or another coding agent.
Write the full PRD in ${USER_LANGUAGE}. Only the final AI Coding Agent prompt may be written in English.
Do not mix English sentences outside the section "Prompt untuk AI Coding Agent".
Technical terms such as frontend, backend, database, deployment, API, server actions, dashboard, login, CRUD, webhook, and authentication may remain in English when natural.

Product idea:
${input.idea}

Technology mode:
${input.techMode}

Selected tech when manual:
${JSON.stringify(input.selectedTech, null, 2)}

Clarifying answers:
${answeredContext || "Tidak ada jawaban tambahan."}

Use this local draft as baseline context, but improve it with stronger product reasoning, more specific requirements, and clearer implementation instructions:

${localDraft}

Required Markdown structure:
# PRD — Project Requirements Document
## Nama Proyek
## 1. Overview
## 2. Requirements
## 3. Core Features
## 4. User Flow
## 5. Architecture
## 6. Database Schema
## 7. Design & Technical Constraints
## 8. API Specification
## 9. Acceptance Criteria
## 10. Prompt untuk AI Coding Agent

Rules:
- Output Markdown only.
- Include Mermaid sequence diagram in Architecture.
- Include Mermaid ERD in Database Schema.
- Include concrete tables, fields, server actions or API endpoints.
- All content before "## 10. Prompt untuk AI Coding Agent" must be written in ${USER_LANGUAGE}.
- Include a final English prompt for an AI coding agent.
- Mention that npm run build must pass.
- Do not require external APIs unless the user explicitly asked for them.
- Do not include secrets or API keys.`;
}

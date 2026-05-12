import type { GeneratePRDInput, ProjectDomain } from "@/lib/generate-prd";

export type AnalyzePromptInput = {
  idea: string;
  detectedDomain: ProjectDomain;
  fallbackQuestions: string[];
};

export function buildAnalyzeIdeaPrompt({ idea, detectedDomain, fallbackQuestions }: AnalyzePromptInput) {
  return `You are a senior product analyst helping a non-technical founder create a precise PRD.

Analyze the product idea and return ONLY valid JSON. Do not wrap in markdown.

Product idea:
${idea}

Local detected domain:
${detectedDomain}

Fallback questions:
${fallbackQuestions.map((question, index) => `${index + 1}. ${question}`).join("\n")}

Return this JSON shape:
{
  "domain": "finance-tracker | inventory | booking-system | learning-app | crm-sales | task-management | content-management | e-commerce | saas-dashboard | generic-web-app",
  "confidence": 0.0,
  "summary": "one sentence product interpretation",
  "questions": [
    {
      "question": "clear clarification question",
      "chips": ["short chip", "short chip", "short chip"]
    }
  ]
}

Rules:
- Return exactly 5 questions.
- Questions must be specific to the domain and product idea.
- Chips must be concise and useful for quick answers.
- If the idea is ambiguous, keep the local detected domain unless another domain is clearly better.`;
}

export function buildGeneratePrdPrompt(input: GeneratePRDInput, localDraft: string) {
  const answeredContext = input.answers
    .filter((answer) => answer.answer.trim())
    .map((answer, index) => `${index + 1}. ${answer.question}\nAnswer: ${answer.answer}`)
    .join("\n\n");

  return `You are a senior product manager and full-stack architect.

Generate a complete, professional PRD in Markdown for an AI coding agent. The document must be long, structured, specific, and directly copy-pasteable into Codex, Claude Code, ChatGPT, Gemini, or another coding agent.

Product idea:
${input.idea}

Technology mode:
${input.techMode}

Selected tech when manual:
${JSON.stringify(input.selectedTech, null, 2)}

Clarifying answers:
${answeredContext || "No extra answers provided."}

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
- Include a final English prompt for an AI coding agent.
- Mention that npm run build must pass.
- Do not require external APIs unless the user explicitly asked for them.
- Do not include secrets or API keys.`;
}

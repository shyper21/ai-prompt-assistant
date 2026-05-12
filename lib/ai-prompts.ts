import type { GeneratePRDInput, ProjectDomain } from "@/lib/generate-prd";
import type { AppLanguage } from "@/lib/i18n";

export const USER_LANGUAGE = "Bahasa Indonesia";

export type AnalyzePromptInput = {
  idea: string;
  detectedDomain: ProjectDomain;
  fallbackQuestions: string[];
  language: AppLanguage;
};

export function buildAnalyzeIdeaPrompt({ idea, detectedDomain, fallbackQuestions, language }: AnalyzePromptInput) {
  const selectedLanguage = language === "id" ? "Bahasa Indonesia" : "English";
  const languageRule =
    language === "id"
      ? `User selected Bahasa Indonesia. All user-facing output MUST be written in Bahasa Indonesia. Clarifying questions, options, explanations, labels, and recommendations must be Indonesian. Do not write English sentences except common technical terms such as frontend, backend, database, API, deployment, server actions, authentication, dashboard.`
      : "User selected English. All user-facing output MUST be written in English. Do not write Indonesian sentences.";

  return `You are a senior product analyst helping a non-technical user create a precise PRD.

Analyze the product idea and return ONLY valid JSON. Do not wrap in markdown.
Selected output language: ${selectedLanguage}.
${languageRule}
The domain slug may remain in English, but summary, question, chips, and any description shown to users must follow the selected language.

Product idea:
${idea}

Local detected domain:
${detectedDomain}

Fallback questions:
${fallbackQuestions.map((question, index) => `${index + 1}. ${question}`).join("\n")}

Return this JSON shape:
{
  "domain": "finance-tracker | inventory | booking-system | learning-app | crm-sales | task-management | content-management | e-commerce | saas-dashboard | ai-agent | generic-web-app",
  "confidence": 0.0,
  "summary": "short product interpretation in selected language",
  "questions": [
    {
      "question": "clarification question in selected language",
      "chips": ["short option", "short option", "short option"]
    }
  ]
}

Rules:
- Return exactly 5 questions.
- Questions must be specific to the domain and product idea, and must follow the selected language.
- Chips must be concise, useful for quick answers, and must follow the selected language.
- Do not mix English and Indonesian in one response.
- If the idea is ambiguous, keep the local detected domain unless another domain is clearly better.`;
}

export function buildGeneratePrdPrompt(input: GeneratePRDInput, localDraft: string) {
  const answeredContext = input.answers
    .filter((answer) => answer.answer.trim())
    .map((answer, index) => `${index + 1}. ${answer.question}\nJawaban: ${answer.answer}`)
    .join("\n\n");

  const requiredStructure =
    input.language === "en"
      ? `# PRD — Project Requirements Document
## Project Name
## 1. Overview
## 2. Requirements
## 3. Core Features
## 4. User Flow
## 5. Architecture
## 6. Database Schema
## 7. Design & Technical Constraints
## 8. API Specification
## 9. Acceptance Criteria
## 10. Prompt for AI Coding Agent`
      : `# PRD — Project Requirements Document
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
## 10. Prompt untuk AI Coding Agent`;

  return `You are a senior product manager and full-stack architect.

Generate a complete, professional PRD in Markdown for an AI coding agent. The document must be long, structured, specific, and directly copy-pasteable into Codex, Claude Code, ChatGPT, Gemini, or another coding agent.
Selected output language: ${input.language === "en" ? "English" : "Bahasa Indonesia"}.
${input.language === "en"
  ? "User selected English. All user-facing output MUST be written in English. Do not write Indonesian sentences."
  : `User selected Bahasa Indonesia. All user-facing output MUST be written in Bahasa Indonesia. Clarifying questions, options, PRD content, explanations, labels, and recommendations must be Indonesian. Do not write English sentences except common technical terms such as frontend, backend, database, API, deployment, server actions, authentication, dashboard. The final AI Coding Agent prompt may be written in English if language is Indonesian.`}
Do not mix English and Indonesian in the same paragraph.
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
${requiredStructure}

Rules:
- Output Markdown only.
- Include Mermaid sequence diagram in Architecture.
- Include Mermaid ERD in Database Schema.
- Include concrete tables, fields, server actions or API endpoints.
- All content must follow the selected output language. If selected language is Bahasa Indonesia, only "## 10. Prompt untuk AI Coding Agent" may be English.
- Include a final English prompt for an AI coding agent.
- Mention that npm run build must pass.
- Do not require external APIs unless the user explicitly asked for them.
- Do not include secrets or API keys.`;
}

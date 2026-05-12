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
      ? "User selected Bahasa Indonesia. All user-facing output MUST be written in Bahasa Indonesia. Do not write English sentences except common technical terms such as frontend, backend, database, API, deployment, server actions, authentication, dashboard."
      : "User selected English. All user-facing output MUST be written in English. Do not write Indonesian sentences.";

  return `You are an AI Product Interviewer helping a beginner/non-coder turn a rough website idea into a precise PRD.
This website is NOT an AI agent builder. Do not assume the user's idea is an AI agent. Treat it as a website/application idea unless the user explicitly asks for AI-agent functionality inside the website.

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
  "domain": "finance-tracker | inventory | booking-system | learning-app | crm-sales | task-management | content-management | e-commerce | saas-dashboard | generic-web-app",
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
- Questions must be specific to the domain and product idea.
- Questions must help a non-technical user explain target users, problem, must-have features, stored data, user flow, login, dashboard, report/export, notifications, and admin panel needs.
- Chips must be concise, useful for quick answers, and must follow the selected language.
- Do not mix English and Indonesian in one response.
- If the idea is ambiguous, keep the local detected domain unless another domain is clearly better.`;
}

export function buildGeneratePrdPrompt(input: GeneratePRDInput, localDraft: string) {
  const answeredContext = input.answers
    .filter((answer) => answer.answer.trim())
    .map((answer, index) =>
      input.language === "en"
        ? `${index + 1}. ${answer.question}\nAnswer: ${answer.answer}`
        : `${index + 1}. ${answer.question}\nJawaban: ${answer.answer}`,
    )
    .join("\n\n");

  const requiredStructure =
    input.language === "en"
      ? `# PRD — Project Requirements Document
## 1. Overview
## 2. Requirements
## 3. Core Features
## 4. User Flow
## 5. Architecture
## 6. Database Schema
## 7. Design & Technical Constraints
## 8. API Specification / Server Actions
## 9. Acceptance Criteria
## 10. Prompt for AI Coding Tool`
      : `# PRD — Project Requirements Document
## 1. Overview
## 2. Requirements
## 3. Core Features
## 4. User Flow
## 5. Architecture
## 6. Database Schema
## 7. Design & Technical Constraints
## 8. API Specification / Server Actions
## 9. Acceptance Criteria
## 10. Prompt untuk AI Coding Tool`;

  return `You are a senior Product Manager, product interviewer, and full-stack architect.

Generate a complete, professional PRD in Markdown for AI coding tools. The document must be specific, detailed, and directly copy-pasteable into Codex, Claude Code, ChatGPT, Claude, Gemini, or another AI coding tool.
Mandatory product direction: the website is an AI Assistant Prompting / PRD Generator for beginners and non-coders, not an AI agent builder. Do not frame every idea as an AI agent. The PRD output should describe the user's actual website/application idea.

Selected output language: ${input.language === "en" ? "English" : "Bahasa Indonesia"}.
${input.language === "en"
  ? "User selected English. All user-facing output MUST be written in English. Do not write Indonesian sentences."
  : "User selected Bahasa Indonesia. Sections 1-9 MUST be written in Bahasa Indonesia. Do not write English sentences except common technical terms such as frontend, backend, database, API, deployment, server actions, authentication, dashboard. Section 10 may be English for AI coding tool performance."}
Do not mix English and Indonesian in the same paragraph.

Product idea:
${input.idea}

Technology mode:
${input.techMode}

Selected tech when manual:
${JSON.stringify(input.selectedTech, null, 2)}

Clarifying answers:
${answeredContext || (input.language === "en" ? "No additional answers." : "Tidak ada jawaban tambahan.")}

Use this local draft as baseline context, but improve it with stronger product reasoning, more specific requirements, and clearer implementation instructions:

${localDraft}

Required Markdown structure:
${requiredStructure}

Rules:
- Output Markdown only.
- Use exactly the 10-section PRD structure above.
- Include Mermaid sequence diagram in Architecture.
- Include Mermaid ERD in Database Schema.
- Keep Architecture and Database Schema in the output.
- Include concrete domain tables, fields, server actions or API endpoints.
- Core Features must contain at least 5 domain-specific features.
- Acceptance Criteria must be a checklist.
- Section 10 must include: Build a complete production-ready web application based on this PRD, tech stack, pages, core features, database schema, API/server actions, UI rules, security rules, environment variables, deployment target, README requirement, run npm run build, and fix all TypeScript/build errors before finishing.
- Do not require external APIs unless the user explicitly asked for them.
- Do not include secrets or API keys.`;
}

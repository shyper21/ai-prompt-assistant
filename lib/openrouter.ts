type OpenRouterMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OpenRouterChoice = {
  message?: {
    content?: string;
  };
};

type OpenRouterResponse = {
  choices?: OpenRouterChoice[];
  error?: {
    message?: string;
  };
};

export type OpenRouterRequest = {
  messages: OpenRouterMessage[];
  temperature?: number;
  maxTokens?: number;
};

export function hasOpenRouterConfig() {
  return Boolean(process.env.OPENROUTER_API_KEY);
}

export async function callOpenRouter({ messages, temperature = 0.3, maxTokens = 6000 }: OpenRouterRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || "openai/gpt-5.2";

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured.");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://promptforge.local",
      "X-Title": "PromptForge AI PRD Generator",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
    }),
  });

  const data = (await response.json().catch(() => ({}))) as OpenRouterResponse;

  if (!response.ok) {
    const message = data.error?.message || `OpenRouter request failed with status ${response.status}.`;
    throw new Error(message);
  }

  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("OpenRouter returned an empty response.");
  }

  return content;
}

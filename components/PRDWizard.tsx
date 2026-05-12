"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import GeneratedPRD from "@/components/GeneratedPRD";
import IdeaStep from "@/components/IdeaStep";
import QuestionsStep from "@/components/QuestionsStep";
import TechPreferenceStep from "@/components/TechPreferenceStep";
import {
  detectProjectDomain,
  getDynamicQuestionChips,
  getDynamicQuestions,
  type ApiMode,
  type PrdAnswer,
  type ProjectDomain,
  type SelectedTech,
  type TechMode,
} from "@/lib/generate-prd";
import type { AppLanguage, I18nText } from "@/lib/i18n";
import { savePrdMemory } from "@/lib/prd-memory";

type WizardStep = "idea" | "tech" | "questions" | "result";

const stepItems: Array<{ id: WizardStep }> = [
  { id: "idea" },
  { id: "tech" },
  { id: "questions" },
  { id: "result" },
];

const defaultTech: SelectedTech = {
  frontend: "Next.js",
  backend: "Next.js API Routes",
  database: "Supabase",
  deployment: "Vercel",
};

const apiModeOptions: ApiMode[] = ["local", "economy", "full"];

function isApiMode(value: string | null): value is ApiMode {
  return value === "local" || value === "economy" || value === "full";
}

function makeCacheKey(scope: "analyze" | "generate", payload: unknown) {
  return `promptforge.${scope}.${JSON.stringify(payload)}`;
}

function readCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, value: T) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Cache is an optimization only. The wizard should keep working if storage is full.
  }
}

type AnalyzeQuestion = {
  question: string;
  chips: string[];
};

type AnalyzeResponse = {
  source?: "openrouter" | "local" | "local-fallback";
  fallback?: boolean;
  reason?: string;
  domain?: ProjectDomain;
  summary?: string;
  questions?: AnalyzeQuestion[];
  error?: string;
};

type GenerateResponse = {
  source?: "openrouter" | "local" | "local-fallback";
  fallback?: boolean;
  reason?: string;
  prd?: string;
  error?: string;
};

type PRDWizardProps = {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  t: I18nText;
};

export default function PRDWizard({ language, setLanguage, t }: PRDWizardProps) {
  const [step, setStep] = useState<WizardStep>("idea");
  const [idea, setIdea] = useState("");
  const [ideaError, setIdeaError] = useState("");
  const [apiMode, setApiMode] = useState<ApiMode>("economy");
  const [techMode, setTechMode] = useState<TechMode>("ai");
  const [selectedTech, setSelectedTech] = useState<SelectedTech>(defaultTech);
  const [answers, setAnswers] = useState<PrdAnswer[]>([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [generatedPrd, setGeneratedPrd] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [aiQuestions, setAiQuestions] = useState<AnalyzeQuestion[] | null>(null);
  const [analyzedDomain, setAnalyzedDomain] = useState<ProjectDomain | null>(null);
  const stepLabels: Record<WizardStep, string> = {
    idea: t.ideaTitle,
    tech: t.techTitle,
    questions: t.questionsTitle,
    result: t.outputTitle,
  };

  const domain = useMemo(() => analyzedDomain || detectProjectDomain(idea), [analyzedDomain, idea]);
  const questions = useMemo(
    () => aiQuestions?.map((item) => item.question) || getDynamicQuestions(domain, language),
    [aiQuestions, domain, language],
  );
  const questionChips = useMemo(
    () => aiQuestions?.map((item) => item.chips) || getDynamicQuestionChips(domain, language),
    [aiQuestions, domain, language],
  );
  const allQuestionsAnswered = questions.every((question) => {
    const answer = answers.find((item) => item.question === question)?.answer || "";
    return answer.trim().length > 0;
  });

  const activeStepIndex = useMemo(
    () => stepItems.findIndex((item) => item.id === step),
    [step],
  );

  useEffect(() => {
    setAnswers((current) =>
      questions.map((question) => {
        const existing = current.find((item) => item.question === question);
        return existing || { question, answer: "" };
      }),
    );
    setActiveQuestion(0);
  }, [questions]);

  useEffect(() => {
    const storedApiMode = window.localStorage.getItem("promptforge.apiMode");
    if (isApiMode(storedApiMode)) {
      setApiMode(storedApiMode);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("promptforge.apiMode", apiMode);
  }, [apiMode]);

  function goToTech() {
    const cleanIdea = idea.trim();

    if (!cleanIdea) {
      setIdeaError(t.ideaRequired);
      return;
    }

    if (cleanIdea.length < 24) {
      setIdeaError(t.ideaTooShort);
      return;
    }

    setIdeaError("");
    setAiQuestions(null);
    setAnalyzedDomain(null);
    setApiMessage("");
    setStep("tech");
  }

  async function analyzeIdeaAndGoToQuestions() {
    setIsAnalyzing(true);
    setApiMessage("");

    try {
      const cleanIdea = idea.trim();
      const cacheKey = makeCacheKey("analyze", { idea: cleanIdea, language, apiMode });
      const cached = readCache<AnalyzeResponse>(cacheKey);

      if (cached?.questions?.length) {
        setAiQuestions(cached.questions);
        setAnalyzedDomain(cached.domain || null);
        setApiMessage(t.cachedResult);
        setStep("questions");
        return;
      }

      const response = await fetch("/api/analyze-idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea: cleanIdea, language, apiMode }),
      });
      const data = (await response.json()) as AnalyzeResponse;

      if (!response.ok || data.error) {
        throw new Error(data.error || t.analyzeFailed);
      }

      if (data.questions?.length) {
        setAiQuestions(data.questions);
      }

      setAnalyzedDomain(data.domain || null);
      writeCache(cacheKey, data);

      if (data.source === "openrouter" && !data.fallback) {
        setApiMessage(t.analyzeSuccess);
      } else if (data.reason) {
        setApiMessage(`${t.generatedWithLocal} ${data.reason}`);
      } else {
        setApiMessage(data.source === "local-fallback" ? t.generatedWithLocal : "");
      }

      setStep("questions");
    } catch (error) {
      const message = error instanceof Error ? error.message : t.analyzeFailed;
      setAiQuestions(null);
      setApiMessage(`${message} ${t.analyzeLocalQuestions}`);
      setStep("questions");
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleModeChange(mode: TechMode) {
    setTechMode(mode);
    if (mode === "manual") {
      setSelectedTech((current) => ({
        frontend: current.frontend || defaultTech.frontend,
        backend: current.backend || defaultTech.backend,
        database: current.database || defaultTech.database,
        deployment: current.deployment || defaultTech.deployment,
      }));
    }
  }

  function handleTechChange(key: keyof SelectedTech, value: string) {
    setSelectedTech((current) => ({ ...current, [key]: value }));
  }

  function handleAnswerChange(index: number, answer: string) {
    setAnswers((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? { ...item, answer } : item)),
    );
  }

  function handleChipSelect(index: number, value: string) {
    setAnswers((current) =>
      current.map((item, itemIndex) => {
        if (itemIndex !== index) return item;
        const nextAnswer = item.answer.trim() ? `${item.answer.trim()}, ${value}` : value;
        return { ...item, answer: nextAnswer };
      }),
    );
  }

  function goToNextQuestion() {
    const currentAnswer = answers[activeQuestion]?.answer || "";
    if (!currentAnswer.trim()) {
      setApiMessage(t.requiredAnswer);
      return;
    }
    setApiMessage("");

    if (activeQuestion < questions.length - 1) {
      setActiveQuestion((current) => current + 1);
      return;
    }

    handleGenerate();
  }

  function goToPreviousQuestion() {
    setActiveQuestion((current) => Math.max(0, current - 1));
  }

  function handleGenerate(forceRefresh = false) {
    if (!allQuestionsAnswered) {
      setApiMessage(t.requiredAllAnswers);
      return;
    }

    setIsGenerating(true);

    async function run() {
      const cleanIdea = idea.trim();
      const payload = {
        idea: cleanIdea,
        language,
        apiMode,
        domain,
        techMode,
        selectedTech,
        answers,
      };
      const cacheKey = makeCacheKey("generate", {
        idea: cleanIdea,
        language,
        apiMode,
        domain,
        techMode,
        selectedTech,
        answers,
      });

      try {
        if (!forceRefresh) {
          const cached = readCache<GenerateResponse>(cacheKey);
          if (cached?.prd) {
            setGeneratedPrd(cached.prd);
            setApiMessage(t.cachedResult);
            savePrdMemory({
              idea: cleanIdea,
              answers,
              generatedPrd: cached.prd,
              createdAt: new Date().toISOString(),
              userFeedback: "",
            });
            setStep("result");
            return;
          }
        }

        const response = await fetch("/api/generate-prd", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = (await response.json()) as GenerateResponse;

        if (!response.ok || data.error || !data.prd) {
          throw new Error(data.error || t.generateFailed);
        }

        setGeneratedPrd(data.prd);
        writeCache(cacheKey, data);
        if (data.source === "openrouter" && !data.fallback) {
          setApiMessage(t.generatedWithOpenRouter);
        } else if (data.reason) {
          setApiMessage(`${t.generatedWithLocal} ${data.reason}`);
        } else {
          setApiMessage(data.source === "local-fallback" ? t.generatedWithLocal : "");
        }
        savePrdMemory({
          idea: cleanIdea,
          answers,
          generatedPrd: data.prd,
          createdAt: new Date().toISOString(),
          userFeedback: "",
        });
        setStep("result");
      } catch (error) {
        const message = error instanceof Error ? error.message : t.generateFailed;
        setApiMessage(message);
      } finally {
        setIsGenerating(false);
      }
    }

    void run();
  }

  function handleRegenerate() {
    if (apiMode !== "local" && !window.confirm(t.quotaWarning)) {
      return;
    }

    handleGenerate(true);
  }

  return (
    <div className="w-full">
      <div className="mb-4 grid grid-cols-4 gap-2">
        {stepItems.map((item, index) => {
          const isDone = index < activeStepIndex;
          const isActive = index === activeStepIndex;
          return (
            <div
              key={item.id}
              className={`rounded-lg border px-3 py-3 ${
                isActive
                  ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-50"
                  : isDone
                    ? "border-lime-300/25 bg-lime-300/10 text-lime-100"
                    : "border-white/10 bg-white/[0.03] text-slate-500"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold">
                {isDone ? <CheckCircle2 size={15} /> : <Circle size={15} />}
                <span className="hidden sm:inline">{stepLabels[item.id]}</span>
                <span className="sm:hidden">{index + 1}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mb-4 flex items-center justify-between rounded-lg border border-white/10 bg-slate-950/45 p-3">
        <span className="text-sm font-bold text-slate-300">{t.languageLabel}</span>
        <div className="flex gap-2">
          {(["id", "en"] as AppLanguage[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setLanguage(item);
                setAiQuestions(null);
                setAnalyzedDomain(null);
                setApiMessage("");
              }}
              className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                language === item
                  ? "bg-cyan-300 text-slate-950"
                  : "border border-white/10 text-slate-300 hover:bg-white/[0.06]"
              }`}
            >
              {item === "id" ? t.indonesia : t.english}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 rounded-lg border border-white/10 bg-slate-950/45 p-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-bold text-slate-300">{t.apiModeLabel}</span>
        <div className="grid grid-cols-3 gap-2">
          {apiModeOptions.map((item) => {
            const label =
              item === "local" ? t.localMode : item === "economy" ? t.economyMode : t.fullMode;
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setApiMode(item);
                  setApiMessage("");
                }}
                className={`rounded-md px-3 py-2 text-sm font-bold transition ${
                  apiMode === item
                    ? "bg-fuchsia-300 text-slate-950"
                    : "border border-white/10 text-slate-300 hover:bg-white/[0.06]"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {step === "idea" ? (
        <IdeaStep idea={idea} error={ideaError} onIdeaChange={setIdea} onNext={goToTech} t={t} />
      ) : null}

      {step === "tech" ? (
        <TechPreferenceStep
          techMode={techMode}
          selectedTech={selectedTech}
          onModeChange={handleModeChange}
          onTechChange={handleTechChange}
          onBack={() => setStep("idea")}
          onNext={analyzeIdeaAndGoToQuestions}
          isAnalyzing={isAnalyzing}
          t={t}
        />
      ) : null}

      {step === "questions" ? (
        <QuestionsStep
          questions={questions}
          chips={questionChips}
          answers={answers}
          activeQuestion={activeQuestion}
          isGenerating={isGenerating}
          message={apiMessage}
          allQuestionsAnswered={allQuestionsAnswered}
          t={t}
          onAnswerChange={handleAnswerChange}
          onChipSelect={handleChipSelect}
          onNextQuestion={goToNextQuestion}
          onBackQuestion={goToPreviousQuestion}
          onBackToTech={() => setStep("tech")}
          onGenerate={handleGenerate}
        />
      ) : null}

      {step === "result" ? (
        <GeneratedPRD
          content={generatedPrd}
          isGenerating={isGenerating}
          message={apiMessage}
          t={t}
          onBackToEdit={() => setStep("idea")}
          onRegenerate={handleRegenerate}
        />
      ) : null}
    </div>
  );
}

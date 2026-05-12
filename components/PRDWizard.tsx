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
  type PrdAnswer,
  type SelectedTech,
  type TechMode,
} from "@/lib/generate-prd";
import { savePrdMemory } from "@/lib/prd-memory";

type WizardStep = "idea" | "tech" | "questions" | "result";

const stepItems: Array<{ id: WizardStep; label: string }> = [
  { id: "idea", label: "Ide" },
  { id: "tech", label: "Teknologi" },
  { id: "questions", label: "Pertanyaan" },
  { id: "result", label: "Output" },
];

const defaultTech: SelectedTech = {
  frontend: "Next.js",
  backend: "Next.js API Routes",
  database: "Supabase",
  deployment: "Vercel",
};

type AnalyzeQuestion = {
  question: string;
  chips: string[];
};

type AnalyzeResponse = {
  source?: "openrouter" | "local";
  fallback?: boolean;
  reason?: string;
  domain?: string;
  summary?: string;
  questions?: AnalyzeQuestion[];
  error?: string;
};

type GenerateResponse = {
  source?: "openrouter" | "local";
  fallback?: boolean;
  reason?: string;
  prd?: string;
  error?: string;
};

export default function PRDWizard() {
  const [step, setStep] = useState<WizardStep>("idea");
  const [idea, setIdea] = useState("");
  const [ideaError, setIdeaError] = useState("");
  const [techMode, setTechMode] = useState<TechMode>("ai");
  const [selectedTech, setSelectedTech] = useState<SelectedTech>(defaultTech);
  const [answers, setAnswers] = useState<PrdAnswer[]>([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [generatedPrd, setGeneratedPrd] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [aiQuestions, setAiQuestions] = useState<AnalyzeQuestion[] | null>(null);

  const domain = useMemo(() => detectProjectDomain(idea), [idea]);
  const questions = useMemo(
    () => aiQuestions?.map((item) => item.question) || getDynamicQuestions(domain),
    [aiQuestions, domain],
  );
  const questionChips = useMemo(
    () => aiQuestions?.map((item) => item.chips) || getDynamicQuestionChips(domain),
    [aiQuestions, domain],
  );

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

  function goToTech() {
    const cleanIdea = idea.trim();

    if (!cleanIdea) {
      setIdeaError("Tulis dulu ide aplikasi kamu sebelum lanjut.");
      return;
    }

    if (cleanIdea.length < 24) {
      setIdeaError("Ide masih terlalu pendek. Tambahkan target user, fitur utama, atau masalah yang ingin diselesaikan.");
      return;
    }

    setIdeaError("");
    setAiQuestions(null);
    setApiMessage("");
    setStep("tech");
  }

  async function analyzeIdeaAndGoToQuestions() {
    setIsAnalyzing(true);
    setApiMessage("");

    try {
      const response = await fetch("/api/analyze-idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });
      const data = (await response.json()) as AnalyzeResponse;

      if (!response.ok || data.error) {
        throw new Error(data.error || "Gagal menganalisis ide.");
      }

      if (data.questions?.length) {
        setAiQuestions(data.questions);
      }

      if (data.fallback && data.reason) {
        setApiMessage(`OpenRouter fallback: ${data.reason}`);
      } else {
        setApiMessage(data.source === "openrouter" ? "Analisis ide dibuat dengan OpenRouter." : "");
      }

      setStep("questions");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Gagal menganalisis ide.";
      setAiQuestions(null);
      setApiMessage(`${message} Menggunakan pertanyaan lokal.`);
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
    if (activeQuestion < questions.length - 1) {
      setActiveQuestion((current) => current + 1);
      return;
    }

    handleGenerate();
  }

  function goToPreviousQuestion() {
    setActiveQuestion((current) => Math.max(0, current - 1));
  }

  function handleGenerate() {
    setIsGenerating(true);

    async function run() {
      const payload = {
        idea,
        techMode,
        selectedTech,
        answers,
      };

      try {
        const response = await fetch("/api/generate-prd", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        const data = (await response.json()) as GenerateResponse;

        if (!response.ok || data.error || !data.prd) {
          throw new Error(data.error || "Gagal generate PRD.");
        }

        setGeneratedPrd(data.prd);
        setApiMessage(data.fallback && data.reason ? `OpenRouter fallback: ${data.reason}` : "");
        savePrdMemory({
          idea,
          answers,
          generatedPrd: data.prd,
          createdAt: new Date().toISOString(),
          userFeedback: "",
        });
        setStep("result");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Gagal generate PRD.";
        setApiMessage(message);
      } finally {
        setIsGenerating(false);
      }
    }

    void run();
  }

  function handleRegenerate() {
    handleGenerate();
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
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{index + 1}</span>
              </div>
            </div>
          );
        })}
      </div>

      {step === "idea" ? (
        <IdeaStep idea={idea} error={ideaError} onIdeaChange={setIdea} onNext={goToTech} />
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
          onAnswerChange={handleAnswerChange}
          onChipSelect={handleChipSelect}
          onSkip={goToNextQuestion}
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
          onBackToEdit={() => setStep("idea")}
          onRegenerate={handleRegenerate}
        />
      ) : null}
    </div>
  );
}

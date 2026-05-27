"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { HelpCircle, CheckCircle2, XCircle } from "lucide-react";

const questions = [
  {
    q: "What is the primary goal of DevOps?",
    options: [
      "To write faster code.",
      "To bridge the gap between development and operations.",
      "To replace system administrators.",
      "To design better UI/UX."
    ],
    answer: 1,
    explanation: "DevOps aims to unify software development (Dev) and software operation (Ops) to enable continuous integration and continuous delivery."
  },
  {
    q: "Which tool is commonly used for containerization?",
    options: ["Jenkins", "Git", "Docker", "Terraform"],
    answer: 2,
    explanation: "Docker is used to containerize applications, making them portable and consistent across different environments."
  },
  {
    q: "What does CI/CD stand for?",
    options: [
      "Continuous Integration / Continuous Deployment",
      "Code Inspection / Code Delivery",
      "Continuous Iteration / Continuous Debugging",
      "Control Infrastructure / Control Delivery"
    ],
    answer: 0,
    explanation: "CI/CD automates the building, testing, and deployment of applications."
  }
];

export function DevOpsQuiz() {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
    setShowResult(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowResult(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(0);
    }
  };

  const question = questions[currentQuestion];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#185FA5]/10 flex items-center justify-center text-[#185FA5]">
            <HelpCircle size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              {t("Why Study DevOps?", "Почему стоит изучать DevOps?")}
            </h2>
            <p className="text-sm text-[var(--muted)]">Test your knowledge and learn the basics.</p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-[var(--foreground)]">
            {currentQuestion + 1}. {question.q}
          </h3>

          <div className="space-y-3">
            {question.options.map((opt, idx) => {
              let btnClass = "border-[var(--border)] bg-[var(--background)] hover:border-[#185FA5]";
              if (showResult) {
                if (idx === question.answer) {
                  btnClass = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
                } else if (idx === selectedOption) {
                  btnClass = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
                } else {
                  btnClass = "border-[var(--border)] opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex justify-between items-center ${btnClass}`}
                >
                  <span>{opt}</span>
                  {showResult && idx === question.answer && <CheckCircle2 className="text-green-500" size={20} />}
                  {showResult && idx === selectedOption && idx !== question.answer && <XCircle className="text-red-500" size={20} />}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Explanation:</strong> {question.explanation}
              </p>
              <button
                onClick={handleNext}
                className="mt-4 px-4 py-2 bg-[#185FA5] text-white rounded-lg text-sm font-medium hover:bg-[#185FA5]/90 transition"
              >
                {currentQuestion < questions.length - 1 ? "Next Question" : "Restart Quiz"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

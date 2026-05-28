"use client";

import { DevOpsQuiz } from "@/components/DevOpsQuiz";

export default function QuizPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-4 tracking-tight">
          Can You Become a DevOps Engineer?
        </h1>
        <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
          Take this quick interactive quiz to find out if a career in DevOps and SRE is right for you.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <DevOpsQuiz />
      </div>
    </div>
  );
}

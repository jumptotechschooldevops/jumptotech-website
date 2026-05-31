"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DbQuiz, DbQuizQuestion } from "@/types/supabase-modules";

export function QuizPageClient({ slug, quizId }: { slug: string, quizId: string }) {
  const [quiz, setQuiz] = useState<DbQuiz | null>(null);
  const [questions, setQuestions] = useState<DbQuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      const { data: qData } = await supabase.from('quizzes').select('*').eq('id', quizId).single();
      if (qData) setQuiz(qData);

      const { data: qstData } = await supabase.from('quiz_questions').select('*').eq('quiz_id', quizId).order('order_index');
      if (qstData) setQuestions(qstData);

      setLoading(false);
    };
    fetchQuiz();
  }, [quizId]);

  if (loading) return <div className="p-12 text-center text-gray-500">Loading Quiz...</div>;
  if (!quiz || questions.length === 0) return <div className="p-12 text-center text-gray-500">Quiz not found or empty.</div>;

  const question = questions[currentQuestion];

  const handleSelect = (opt: string) => {
    if (showResult) return;
    setSelectedOption(opt);
    setShowResult(true);
    if (opt === question.correct_answer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowResult(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
    }
  };

  const passingScore = quiz.passing_score || 70;
  const scorePct = Math.round((score / questions.length) * 100);
  const passed = scorePct >= passingScore;

  if (finished) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Finished</h2>
        <div className={`text-5xl font-extrabold mb-6 ${passed ? 'text-green-500' : 'text-red-500'}`}>
          {scorePct}%
        </div>
        <p className="mb-8">You answered {score} out of {questions.length} questions correctly. Passing score is {passingScore}%.</p>
        <div className="flex justify-center gap-4">
          <Link href={`/modules/${slug}`} className="px-6 py-2 bg-gray-200 text-black rounded hover:bg-gray-300">
            Back to Module
          </Link>
          <button onClick={() => { setFinished(false); setCurrentQuestion(0); setScore(0); }} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href={`/modules/${slug}`} className="inline-flex items-center gap-2 mb-8 text-blue-600 hover:underline">
        <ArrowLeft size={16} /> Back to Module
      </Link>
      <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">{quiz.title}</h2>
          <p className="text-sm text-[var(--muted)]">Question {currentQuestion + 1} of {questions.length}</p>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-[var(--foreground)]">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((opt: string, idx: number) => {
              let btnClass = "border-[var(--border)] bg-[var(--background)] hover:border-[#185FA5]";
              if (showResult) {
                if (opt === question.correct_answer) {
                  btnClass = "border-green-500 bg-green-500/10 text-green-700 dark:text-green-400";
                } else if (opt === selectedOption) {
                  btnClass = "border-red-500 bg-red-500/10 text-red-700 dark:text-red-400";
                } else {
                  btnClass = "border-[var(--border)] opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex justify-between items-center ${btnClass}`}
                >
                  <span>{opt}</span>
                  {showResult && opt === question.correct_answer && <CheckCircle2 className="text-green-500" size={20} />}
                  {showResult && opt === selectedOption && opt !== question.correct_answer && <XCircle className="text-red-500" size={20} />}
                </button>
              );
            })}
          </div>

          {showResult && (
            <button
              onClick={handleNext}
              className="mt-6 px-6 py-2 bg-[#185FA5] text-white rounded-lg font-medium hover:bg-[#185FA5]/90 transition"
            >
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

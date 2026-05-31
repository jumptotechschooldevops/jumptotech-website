import { QuizPageClient } from "./QuizPageClient";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string; quizId: string }>;
}) {
  const { slug, quizId } = await params;
  return <QuizPageClient slug={slug} quizId={quizId} />;
}

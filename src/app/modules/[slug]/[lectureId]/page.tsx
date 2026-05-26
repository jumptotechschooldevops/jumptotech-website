import { modules } from "@/lib/data";
import { LecturePageClient } from "./LecturePageClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const params: { slug: string; lectureId: string }[] = [];
  for (const mod of modules) {
    for (const lecture of mod.lectures) {
      params.push({ slug: mod.slug, lectureId: lecture.id });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lectureId: string }>;
}) {
  const { slug, lectureId } = await params;
  const mod = modules.find((m) => m.slug === slug);
  if (!mod) return {};
  const lecture = mod.lectures.find((l) => l.id === lectureId);
  if (!lecture) return {};
  return {
    title: `${lecture.title} — ${mod.title} | JumpToTech`,
    description: lecture.description,
  };
}

export default async function LecturePage({
  params,
}: {
  params: Promise<{ slug: string; lectureId: string }>;
}) {
  const { slug, lectureId } = await params;
  const mod = modules.find((m) => m.slug === slug);
  if (!mod) notFound();

  // Provide static content from data.ts as initial fallback
  const lecture = mod.lectures.find((l) => l.id === lectureId);
  const initialContent = lecture?.content ?? null;

  return (
    <LecturePageClient
      module={mod}
      lectureId={lectureId}
      initialContent={initialContent}
    />
  );
}

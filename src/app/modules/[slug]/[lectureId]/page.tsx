import { LecturePageClient } from "./LecturePageClient";

export default async function LecturePage({
  params,
}: {
  params: Promise<{ slug: string; lectureId: string }>;
}) {
  const { slug, lectureId } = await params;
  return (
    <LecturePageClient
      slug={slug}
      lectureId={lectureId}
    />
  );
}

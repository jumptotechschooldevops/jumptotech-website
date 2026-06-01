"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { DbModule, DbLecture } from "@/types/supabase-modules";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  PlayCircle,
  Award,
  FileText,
  ExternalLink,
} from "lucide-react";

interface Props {
  slug: string;
  lectureId: string;
}

const mdComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => <h1 className="md-h1">{children}</h1>,
  h2: ({ children }: { children?: React.ReactNode }) => <h2 className="md-h2">{children}</h2>,
  h3: ({ children }: { children?: React.ReactNode }) => <h3 className="md-h3">{children}</h3>,
  h4: ({ children }: { children?: React.ReactNode }) => <h4 className="md-h4">{children}</h4>,
  h5: ({ children }: { children?: React.ReactNode }) => <h5 className="md-h5">{children}</h5>,
  p: ({ children }: { children?: React.ReactNode }) => <p className="md-p">{children}</p>,
  ul: ({ children }: { children?: React.ReactNode }) => <ul className="md-ul">{children}</ul>,
  ol: ({ children }: { children?: React.ReactNode }) => <ol className="md-ol">{children}</ol>,
  li: ({ children }: { children?: React.ReactNode }) => <li className="md-li">{children}</li>,
  blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="md-blockquote">{children}</blockquote>,
  hr: () => <hr className="md-hr" />,
  pre: ({ children }: { children?: React.ReactNode }) => <pre className="md-pre">{children}</pre>,
  code: ({ inline, children }: { inline?: boolean; children?: React.ReactNode }) =>
    inline
      ? <code className="md-inline-code">{children}</code>
      : <code className="md-code">{children}</code>,
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="md-table-wrap"><table className="md-table">{children}</table></div>
  ),
  th: ({ children }: { children?: React.ReactNode }) => <th className="md-th">{children}</th>,
  td: ({ children }: { children?: React.ReactNode }) => <td className="md-td">{children}</td>,
  tr: ({ children }: { children?: React.ReactNode }) => <tr className="md-tr">{children}</tr>,
};

export function LecturePageClient({ slug, lectureId }: Props) {
  const router = useRouter();
  const { loggedIn, mounted: authMounted } = useAuth();

  const [mod, setMod] = useState<DbModule | null>(null);
  const [lectures, setLectures] = useState<DbLecture[]>([]);
  const [labsCount, setLabsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authMounted && !loggedIn) router.replace("/login");
  }, [authMounted, loggedIn, router]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: modData } = await supabase.from('modules').select('*').eq('slug', slug).single();
      if (!modData) {
        setLoading(false);
        return;
      }
      setMod(modData);

      const { data: lecData } = await supabase.from('lectures').select('*').eq('module_slug', modData.slug).eq('published', true).order('order_index');
      if (lecData) setLectures(lecData);

      const { count } = await supabase.from('labs').select('*', { count: 'exact', head: true }).eq('module_slug', modData.slug).eq('published', true);
      setLabsCount(count || 0);

      setLoading(false);
    };
    fetchData();
  }, [slug]);

  const { mounted, completedLectures, completedLabs, toggleLecture } = useProgress(mod ? mod.id : "");

  if (!authMounted || !loggedIn) return null;
  if (loading) return <div className="p-12 text-center text-[var(--muted)]">Loading lecture...</div>;
  if (!mod || lectures.length === 0) return <div className="p-12 text-center text-[var(--muted)]">Lecture not found.</div>;

  const currentIdx = lectures.findIndex((l) => l.id === lectureId);
  const lecture = lectures[currentIdx];

  if (!lecture) return <div className="p-12 text-center text-[var(--muted)]">Lecture not found.</div>;

  const prevLecture = currentIdx > 0 ? lectures[currentIdx - 1] : null;
  const nextLecture = currentIdx >= 0 && currentIdx < lectures.length - 1 ? lectures[currentIdx + 1] : null;

  const isCompleted = mounted && completedLectures.includes(lectureId);
  const totalItems = lectures.length + labsCount;
  const completedCount = completedLectures.length + completedLabs.length;
  const progressPct = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  const content = lecture.content ?? lecture.description ?? "";

  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Top nav */}
      <div className="bg-[var(--card-bg)] border-b border-[var(--border)] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href={`/modules/${mod.slug}`}
            className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to {mod.title}</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs font-semibold text-[var(--foreground)]">{progressPct}% Complete</div>
                <div className="text-[10px] text-[var(--muted)]">{completedCount}/{totalItems} items</div>
              </div>
              <div className="w-24 h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#185FA5] rounded-full transition-all duration-500"
                  style={{ width: mounted ? `${progressPct}%` : "0%" }}
                />
              </div>
            </div>

            <button
              onClick={() => mounted && toggleLecture(lecture.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                isCompleted
                  ? "bg-[#1D9E75]/10 text-[#1D9E75] hover:bg-[#1D9E75]/20 border border-[#1D9E75]/20"
                  : "bg-[#185FA5] text-white hover:bg-[#185FA5]/90 border border-transparent"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle size={16} />
                  <span>Mark Complete</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-3">
                <span className="px-2 py-0.5 rounded bg-[var(--muted-bg)] font-medium">Lecture {currentIdx + 1}</span>
                <span>•</span>
                <span>{lecture.duration}</span>
                <span>•</span>
                <span className="capitalize">{lecture.type}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] mb-4 leading-tight">
                {lecture.title}
              </h1>
            </div>

            <div className="prose prose-invert max-w-none mb-12">
              {lecture.lecture_type === "external" && lecture.external_url ? (
                <div className="p-8 rounded-xl border border-gray-800 bg-gray-900/50 text-center">
                  <h3 className="text-xl font-bold text-white mb-4">External Resource</h3>
                  <p className="text-gray-400 mb-6">This lecture is hosted externally. Click below to view the content.</p>
                  <a
                    href={lecture.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#185FA5] text-white rounded-md hover:bg-[#185FA5]/90 font-medium transition-colors"
                  >
                    Open Resource <ExternalLink size={18} />
                  </a>
                </div>
              ) : (
                <>
                  <Markdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {content}
                  </Markdown>

                  {lecture.video_url && (
                    <div className="mt-8 p-4 rounded-xl border border-gray-800 bg-gray-900/50">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                        <PlayCircle size={20} className="text-[#185FA5]" />
                        Video Resource
                      </h3>
                      <a href={lecture.video_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">
                        {lecture.video_url}
                      </a>
                    </div>
                  )}

                  {lecture.pdf_url && (
                    <div className="mt-4 p-4 rounded-xl border border-gray-800 bg-gray-900/50">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                        <FileText size={20} className="text-[#1D9E75]" />
                        PDF Resource
                      </h3>
                      <a href={lecture.pdf_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">
                        {lecture.pdf_url}
                      </a>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Bottom navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-[var(--border)]">
              {prevLecture ? (
                <Link
                  href={`/modules/${mod.slug}/${prevLecture.id}`}
                  className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors group"
                >
                  <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  <div className="hidden sm:block">
                    <div className="text-xs font-semibold mb-0.5 text-right">Previous</div>
                    <div className="text-sm truncate max-w-[200px]">{prevLecture.title}</div>
                  </div>
                  <div className="sm:hidden text-sm font-medium">Prev</div>
                </Link>
              ) : <div />}

              {nextLecture ? (
                <Link
                  href={`/modules/${mod.slug}/${nextLecture.id}`}
                  className="flex items-center gap-2 text-[#185FA5] hover:text-[#185FA5]/80 transition-colors group text-right"
                >
                  <div className="hidden sm:block">
                    <div className="text-xs font-semibold mb-0.5">Next</div>
                    <div className="text-sm truncate max-w-[200px]">{nextLecture.title}</div>
                  </div>
                  <div className="sm:hidden text-sm font-medium">Next</div>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link
                  href={`/modules/${mod.slug}`}
                  className="flex items-center gap-2 text-[#1D9E75] hover:text-[#1D9E75]/80 transition-colors font-medium"
                >
                  <Award size={18} />
                  Finish Module
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4">
              <h3 className="font-bold text-[var(--foreground)] mb-4 px-2">Lectures</h3>
              <div className="space-y-1">
                {lectures.map((l, idx) => {
                  const isCurrent = l.id === lectureId;
                  const isDone = mounted && completedLectures.includes(l.id);

                  return (
                    <Link
                      key={l.id}
                      href={`/modules/${mod.slug}/${l.id}`}
                      className={`flex items-start gap-2.5 p-2 rounded-lg transition-colors text-sm ${
                        isCurrent
                          ? "bg-[#185FA5]/10 text-[#185FA5] font-semibold"
                          : "hover:bg-[var(--muted-bg)] text-[var(--muted)]"
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 size={16} className="text-[#1D9E75]" />
                        ) : (
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] ${
                            isCurrent ? "border-[#185FA5] text-[#185FA5]" : "border-[var(--muted)] text-[var(--muted)]"
                          }`}>
                            {idx + 1}
                          </span>
                        )}
                      </div>
                      <span className="leading-snug">{l.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

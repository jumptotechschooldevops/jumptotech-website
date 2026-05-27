"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppState } from "@/contexts/AppStateContext";

export default function StudentDashboard() {
  const { loggedIn, role, authMounted, displayName } = useAuth();
  const router = useRouter();
  const { projects, submitProject, modulesData } = useAppState();
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (authMounted && !loggedIn) {
      router.push("/login");
    }
  }, [authMounted, loggedIn, router]);

  if (!authMounted || !loggedIn) {
    return <div className="p-20 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Student Portal</h1>
      <p className="text-[var(--muted)] mb-8">Welcome to your course materials. Here you can access all unlocked modules, lectures, and labs.</p>

      {/* Progress Section */}
      <div className="mb-12 bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Your Progress</h2>
        {(() => {
          const publishedModules = modulesData.filter(m => m.isPublished !== false);
          let totalLectures = 0;
          let completedLectures = 0;
          let nextLectureLink = "/modules";

          for (const mod of publishedModules) {
            for (const lec of mod.lectures) {
              if ((lec as import('@/contexts/AppStateContext').LectureWithVisibility).isVisible !== false) {
                totalLectures++;
                if (lec.completed) {
                  completedLectures++;
                } else if (nextLectureLink === "/modules") {
                  nextLectureLink = `/modules/${mod.slug}/${lec.id}`;
                }
              }
            }
          }

          const progressPercent = totalLectures === 0 ? 0 : Math.round((completedLectures / totalLectures) * 100);

          return (
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold text-[#185FA5]">{progressPercent}%</p>
                  <p className="text-sm text-[var(--muted)]">Course Completed</p>
                </div>
                <p className="text-sm font-medium">{completedLectures} of {totalLectures} lessons finished</p>
              </div>
              <div className="w-full bg-[var(--background)] border border-[var(--border)] rounded-full h-4 overflow-hidden">
                <div
                  className="bg-[#1D9E75] h-4 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="pt-4 flex justify-end">
                <Link
                  href={nextLectureLink}
                  className="bg-[#185FA5] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#185FA5]/90 transition inline-block"
                >
                  Continue Learning →
                </Link>
              </div>
            </div>
          );
        })()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/courses/lectures" className="p-6 bg-[#185FA5]/10 border border-[#185FA5]/30 rounded-2xl hover:bg-[#185FA5]/20 transition">
          <h2 className="text-xl font-bold text-[#185FA5] mb-2">Lectures</h2>
          <p className="text-sm text-[var(--muted)]">Access all video and reading materials.</p>
        </Link>
        <Link href="/courses/labs" className="p-6 bg-[#1D9E75]/10 border border-[#1D9E75]/30 rounded-2xl hover:bg-[#1D9E75]/20 transition">
          <h2 className="text-xl font-bold text-[#1D9E75] mb-2">Hands-on Labs</h2>
          <p className="text-sm text-[var(--muted)]">Practice what you learned with real scenarios.</p>
        </Link>
        <Link href="/modules" className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl hover:bg-[var(--hover-bg)] transition">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">All Modules</h2>
          <p className="text-sm text-[var(--muted)]">Browse content by module.</p>
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4">Submit Project Deployment</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (url.trim()) {
                submitProject({ studentName: displayName || "Student", url, description });
                setUrl("");
                setDescription("");
                alert("Project submitted successfully!");
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Deployment URL *</label>
              <input
                type="url"
                required
                value={url}
                onChange={e => setUrl(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:border-[#185FA5]"
                placeholder="https://my-app.vercel.app"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full bg-[var(--background)] border border-[var(--border)] rounded px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:border-[#185FA5] h-24"
                placeholder="Briefly describe what this project does and the stack used..."
              />
            </div>
            <button type="submit" className="bg-[#185FA5] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#185FA5]/90">
              Submit for Review
            </button>
          </form>
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--border)] p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4">My Submissions</h2>
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
            {projects.filter(p => p.studentName === (displayName || "Student")).length === 0 ? (
              <p className="text-[var(--muted)] text-sm">You haven&apos;t submitted any projects yet.</p>
            ) : (
              projects.filter(p => p.studentName === (displayName || "Student")).map(proj => (
                <div key={proj.id} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--background)]">
                  <div className="flex justify-between items-start mb-2">
                    <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-[#185FA5] hover:underline font-medium break-all">
                      {proj.url}
                    </a>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${proj.status === "reviewed" ? "bg-[#1D9E75]/10 text-[#1D9E75] border-[#1D9E75]/30" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/30"}`}>
                      {proj.status === "reviewed" ? "Reviewed" : "Pending Review"}
                    </span>
                  </div>
                  {proj.description && <p className="text-sm text-[var(--muted)] mb-3 line-clamp-2">{proj.description}</p>}

                  {proj.feedback && (
                    <div className="mt-3 p-3 bg-[#185FA5]/5 border border-[#185FA5]/20 rounded-lg">
                      <p className="text-xs font-bold text-[#185FA5] mb-1">Instructor Feedback:</p>
                      <p className="text-sm text-[var(--foreground)]">{proj.feedback}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function StudentDashboard() {
  const { loggedIn, role, authMounted } = useAuth();
  const router = useRouter();

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
    </div>
  );
}

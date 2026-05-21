import Link from "next/link";
import { Rocket } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center mb-6">
        <Rocket size={28} className="text-white" />
      </div>
      <h1 className="text-4xl font-extrabold text-[var(--foreground)] mb-2">404</h1>
      <p className="text-xl font-semibold text-[var(--muted)] mb-4">Page not found</p>
      <p className="text-[var(--muted)] mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-[#185FA5] text-white font-semibold hover:bg-[#0f4a8a] transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/modules"
          className="px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold hover:bg-[var(--muted-bg)] transition-colors"
        >
          Browse Modules
        </Link>
      </div>
    </div>
  );
}

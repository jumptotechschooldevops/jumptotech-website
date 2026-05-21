"use client";

export function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0f4a8a] border-t-2 border-[#185FA5]/60 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-white text-sm font-medium text-center sm:text-left">
          <span className="hidden sm:inline">Batch 4 starts June 1 · </span>
          <span className="text-yellow-300 font-bold">$700/month</span>
          {" · "}5 days/week · 3 hours/day
        </p>
        <a
          href="#register"
          className="shrink-0 px-5 py-2 rounded-lg bg-white text-[#185FA5] font-bold text-sm hover:bg-white/90 transition-colors whitespace-nowrap"
        >
          Register Now →
        </a>
      </div>
    </div>
  );
}

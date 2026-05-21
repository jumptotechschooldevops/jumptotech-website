"use client";

import { useState, useEffect } from "react";

function getCountdown(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

const TARGET = new Date("2026-06-01T00:00:00");

export function AnnouncementBanner() {
  const [countdown, setCountdown] = useState(getCountdown(TARGET));
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setCountdown(getCountdown(TARGET)), 1000);
    return () => clearInterval(id);
  }, []);

  if (dismissed) return null;

  return (
    <div className="relative bg-[#185FA5] text-white py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
        <span className="font-semibold">
          🚀 Batch 4 starts June 1, 2026 — Limited spots available!
        </span>
        <div className="flex items-center gap-1.5 font-mono text-xs bg-white/20 rounded-lg px-3 py-1 tabular-nums">
          <span>{String(countdown.days).padStart(2, "0")}d</span>
          <span className="opacity-50">:</span>
          <span>{String(countdown.hours).padStart(2, "0")}h</span>
          <span className="opacity-50">:</span>
          <span>{String(countdown.minutes).padStart(2, "0")}m</span>
          <span className="opacity-50">:</span>
          <span>{String(countdown.seconds).padStart(2, "0")}s</span>
        </div>
        <a
          href="#register"
          className="underline underline-offset-2 font-semibold hover:text-white/80 transition-colors"
        >
          Register →
        </a>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/20 transition-colors text-base leading-none"
        aria-label="Dismiss banner"
      >
        ×
      </button>
    </div>
  );
}

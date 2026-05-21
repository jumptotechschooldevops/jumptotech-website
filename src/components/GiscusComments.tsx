"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface GiscusCommentsProps {
  term: string;
}

export function GiscusComments({ term }: GiscusCommentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "jumptotech/devops-school");
    script.setAttribute("data-repo-id", "R_kgDOExample");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOExample");
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", term);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute(
      "data-theme",
      resolvedTheme === "dark" ? "dark_dimmed" : "light"
    );
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.crossOrigin = "anonymous";
    script.async = true;

    ref.current.appendChild(script);
  }, [resolvedTheme, term]);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[var(--foreground)]">
        <span className="w-1 h-5 rounded-full bg-[var(--primary)] block" />
        Student Discussion
      </h2>
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6">
        <div
          className="text-sm text-[var(--muted)] mb-4 p-4 rounded-xl bg-[var(--muted-bg)] border border-[var(--border)]"
        >
          <strong className="text-[var(--foreground)]">Note:</strong> Comments are powered by{" "}
          <a
            href="https://giscus.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] underline"
          >
            Giscus
          </a>
          . Sign in with GitHub to participate in the discussion.
        </div>
        <div ref={ref} />
      </div>
    </div>
  );
}

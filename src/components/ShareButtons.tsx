"use client";

import { Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-[var(--muted)]">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-[var(--background)] border border-[var(--border)] hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter size={18} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full bg-[var(--background)] border border-[var(--border)] hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={18} />
      </a>
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-full bg-[var(--background)] border border-[var(--border)] hover:bg-gray-500/10 hover:border-gray-500/30 transition-colors"
        aria-label="Copy link"
      >
        {copied ? <Check size={18} className="text-green-500" /> : <LinkIcon size={18} />}
      </button>
    </div>
  );
}
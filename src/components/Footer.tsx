import Link from "next/link";
import { Rocket, Code2, Play, MessageSquare } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card-bg)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
                <Rocket size={16} className="text-white" />
              </div>
              <span className="font-bold">
                <span className="text-[var(--primary)]">JumpTo</span>Tech DevOps School
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] max-w-xs leading-relaxed">
              Hands-on DevOps education covering Git, Linux, Docker, Kubernetes, Terraform, AWS, and more. Built for engineers who want to ship faster and smarter.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/jumptotech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[var(--muted-bg)] flex items-center justify-center hover:bg-[var(--border)] transition-colors"
                aria-label="GitHub"
              >
                <Code2 size={15} className="text-[var(--muted)]" />
              </a>
              <a
                href="https://youtube.com/@jumptotech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[var(--muted-bg)] flex items-center justify-center hover:bg-[var(--border)] transition-colors"
                aria-label="YouTube"
              >
                <Play size={15} className="text-[var(--muted)]" />
              </a>
              <a
                href="https://t.me/jumptotech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[var(--muted-bg)] flex items-center justify-center hover:bg-[var(--border)] transition-colors"
                aria-label="Telegram"
              >
                <MessageSquare size={15} className="text-[var(--muted)]" />
              </a>
            </div>
          </div>

          {/* Modules */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Modules</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {["Git", "Linux", "Docker", "Kubernetes", "Terraform"].map((m) => (
                <li key={m}>
                  <Link
                    href={`/modules/${m.toLowerCase()}`}
                    className="hover:text-[var(--primary)] transition-colors"
                  >
                    {m}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[var(--foreground)]">More</h3>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              {["CI/CD", "AWS", "Azure", "Ansible", "Kafka"].map((m) => (
                <li key={m}>
                  <Link
                    href={`/modules/${m.toLowerCase().replace("/", "").replace(" ", "-")}`}
                    className="hover:text-[var(--primary)] transition-colors"
                  >
                    {m}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--muted)]">
            © 2026 JumpToTech. All rights reserved.
          </p>
          <p className="text-xs text-[var(--muted)]">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Rocket } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/modules", label: "Modules" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
              <Rocket size={16} className="text-white" />
            </div>
            <span className="font-bold text-sm sm:text-base leading-tight">
              <span className="text-[var(--primary)]">JumpTo</span>
              <span className="text-[var(--foreground)]">Tech</span>
              <span className="hidden sm:inline text-[var(--muted)] font-normal"> DevOps School</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === l.href
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <ThemeToggle />
            <Link
              href="/modules"
              className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors"
            >
              Start Learning
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--muted-bg)] hover:bg-[var(--border)] transition-colors"
              aria-label="Menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-[var(--border)] py-3 space-y-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === l.href
                    ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                    : "text-[var(--muted)] hover:bg-[var(--muted-bg)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/modules"
              onClick={() => setOpen(false)}
              className="block mx-3 mt-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium text-center"
            >
              Start Learning
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

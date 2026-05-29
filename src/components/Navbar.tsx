"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Rocket, Lock, LogOut } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/hooks/useAuth";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const { loggedIn, displayName, mounted, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    router.push("/");
  };

  const links = [
    { href: "/", label: lang === "ru" ? "Главная" : "Home" },
    { href: "/modules", label: lang === "ru" ? "Модули" : "Modules" },
    { href: "/student-projects", label: lang === "ru" ? "Проекты студентов" : "Student Projects" },
    { href: "/founder", label: lang === "ru" ? "Основатель" : "Founder" },
    { href: "/certifications", label: lang === "ru" ? "Сертификаты" : "Certifications" },
    { href: "/admin/projects", label: lang === "ru" ? "Админ" : "Admin" },
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
          <div className="hidden md:flex items-center gap-4">
            {links.map((l) => {
              const isActive = pathname === l.href || (l.href === '/admin/projects' && pathname.startsWith('/admin'));
              return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {l.label}
              </Link>
            )})}

            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-[var(--border)] text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
              aria-label="Toggle language"
            >
              {lang === "en" ? "RU" : "EN"}
            </button>

            <ThemeToggle />

            {mounted && loggedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/modules"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1D9E75]/10 text-[#1D9E75] text-sm font-medium hover:bg-[#1D9E75]/20 transition-colors"
                >
                  <Rocket size={14} />
                  {displayName ? `Hi ${displayName.split(" ")[0]}` : (lang === "ru" ? "Портал" : "My Portal")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-[var(--muted)] hover:bg-[var(--muted-bg)] hover:text-[var(--foreground)] transition-colors"
                  aria-label="Logout"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors"
              >
                <Lock size={14} />
                {lang === "ru" ? "Войти" : "Student Portal"}
              </Link>
            )}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-2 py-1 rounded-md text-xs font-semibold border border-[var(--border)] text-[var(--muted)]"
            >
              {lang === "en" ? "RU" : "EN"}
            </button>
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
            {links.map((l) => {
              const isActive = pathname === l.href || (l.href === '/admin/projects' && pathname.startsWith('/admin'));
              return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                    : "text-[var(--muted)] hover:bg-[var(--muted-bg)]"
                }`}
              >
                {l.label}
              </Link>
            )})}
            {mounted && loggedIn ? (
              <>
                <Link
                  href="/modules"
                  onClick={() => setOpen(false)}
                  className="block mx-3 mt-2 px-4 py-2 rounded-lg bg-[#1D9E75]/10 text-[#1D9E75] text-sm font-medium text-center"
                >
                  {displayName ? `Hi ${displayName.split(" ")[0]}` : (lang === "ru" ? "Мой портал" : "My Portal")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-lg text-sm text-[var(--muted)] hover:bg-[var(--muted-bg)]"
                >
                  {lang === "ru" ? "Выйти" : "Log out"}
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 mx-3 mt-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium"
              >
                <Lock size={14} />
                {lang === "ru" ? "Войти" : "Student Portal"}
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

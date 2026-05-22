"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Rocket, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          phone: form.phone,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (signUpData.user) {
      await supabase.from("profiles").upsert({
        id: signUpData.user.id,
        full_name: form.fullName,
        phone: form.phone,
      });
    }

    const instructorEmail = process.env.NEXT_PUBLIC_INSTRUCTOR_EMAIL ?? "aisalkynaidarova8@gmail.com";
    const body = `New student signed up:%0A%0AName: ${encodeURIComponent(form.fullName)}%0AEmail: ${encodeURIComponent(form.email)}%0APhone: ${encodeURIComponent(form.phone)}`;
    window.open(`mailto:${instructorEmail}?subject=New%20Student%20Registration%20%E2%80%94%20JumpToTech&body=${body}`);

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[var(--background)] px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-10 shadow-lg">
            <CheckCircle2 size={56} className="text-[#1D9E75] mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[var(--foreground)] mb-3">
              Account Created!
            </h1>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">
              Please check your email to confirm your address, then you can log in.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#185FA5] text-white text-sm font-semibold hover:bg-[#0f4a8a] transition-colors"
            >
              Go to Login
            </Link>
          </div>
          <div className="mt-4">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              <Rocket size={12} />
              Back to JumpToTech
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[var(--background)] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center mx-auto mb-4">
              <UserPlus size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">Create Account</h1>
            <p className="text-[var(--muted)] text-sm mt-1">Создать аккаунт студента</p>
            <p className="text-xs text-[var(--muted)] mt-2">
              Register to access the student portal after instructor approval
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={set("fullName")}
                autoComplete="name"
                required
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                autoComplete="tel"
                required
                placeholder="+7 (700) 000-0000"
                className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  autoComplete="new-password"
                  required
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={set("confirmPassword")}
                  autoComplete="new-password"
                  required
                  placeholder="Repeat your password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#185FA5] text-white font-semibold hover:bg-[#0f4a8a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[var(--border)] text-center">
            <p className="text-xs text-[var(--muted)]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#185FA5] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
            <Rocket size={12} />
            Back to JumpToTech
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Rocket, Eye, EyeOff, X, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

function ForgotPasswordModal({ onClose }: { onClose: () => void }) {
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);

    // Mock reset logic
    setTimeout(() => {
      setResetSent(true);
      setResetLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[var(--foreground)]">Reset Password</h2>
          <button
            onClick={onClose}
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {resetSent ? (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-[#1D9E75]/10 flex items-center justify-center mx-auto mb-3">
              <Mail size={20} className="text-[#1D9E75]" />
            </div>
            <p className="text-sm font-medium text-[var(--foreground)] mb-1">
              Password reset link sent to your email!
            </p>
            <p className="text-xs text-[var(--muted)]">Check your inbox and follow the link to set a new password.</p>
            <button
              onClick={onClose}
              className="mt-4 text-xs text-[#185FA5] hover:underline"
            >
              Back to login
            </button>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <p className="text-xs text-[var(--muted)]">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition-colors text-sm"
            />
            <button
              type="submit"
              disabled={resetLoading}
              className="w-full py-2.5 rounded-xl bg-[#185FA5] text-white font-semibold hover:bg-[#0f4a8a] disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {resetLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Mock Login
    setTimeout(() => {
      login(email, "Test User");
      setLoading(false);
      router.push("/modules");
    }, 1000);
  };

  return (
    <>
      {showForgotPassword && (
        <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />
      )}

      <div className="min-h-[80vh] flex items-center justify-center bg-[var(--background)] px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl hero-gradient flex items-center justify-center mx-auto mb-4">
                <Lock size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">Student Portal</h1>
              <p className="text-[var(--muted)] text-sm mt-1">Портал студента</p>
              <p className="text-xs text-[var(--muted)] mt-2">
                Sign in to access your course materials (Mock Auth)
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  placeholder="you@example.com (use admin for admin role)"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    placeholder="Enter your password (any password works)"
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
                <div className="mt-1.5 text-right">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-xs text-[#185FA5] hover:underline"
                  >
                    Forgot password?
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
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[var(--border)] text-center space-y-2">
              <p className="text-xs text-[var(--muted)]">
                Not enrolled yet?{" "}
                <Link href="/#register" className="text-[#185FA5] hover:underline font-medium">
                  Register for Batch 4
                </Link>
              </p>
              <p className="text-xs text-[var(--muted)]">
                Have an account?{" "}
                <Link href="/register" className="text-[#185FA5] hover:underline font-medium">
                  Sign up for Student Portal
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
    </>
  );
}

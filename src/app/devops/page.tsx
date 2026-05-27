import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { GitMerge, Repeat, Zap, ArrowRight } from "lucide-react";

export default function DevOpsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
              What is DevOps?
            </h1>
            <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
              DevOps is the union of people, process, and technology to continually provide value to customers. Discover how it bridges the gap between development and operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <GitMerge className="text-[#185FA5] w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Version Control & Collaboration</h3>
              <p className="text-[var(--muted)]">
                Manage code changes efficiently with tools like Git. Foster a culture of collaboration across development, QA, and IT operations.
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <Repeat className="text-[#1D9E75] w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">CI/CD Pipelines</h3>
              <p className="text-[var(--muted)]">
                Automate the building, testing, and deployment of applications to deliver high-quality software quickly and safely.
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <Zap className="text-yellow-500 w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Automation & IaC</h3>
              <p className="text-[var(--muted)]">
                Replace manual processes with automation. Provision and manage infrastructure using code (Infrastructure as Code) for consistency and speed.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#185FA5]/10 to-[#1D9E75]/10 rounded-3xl p-10 md:p-16 text-center border border-[var(--border)]">
            <h2 className="text-3xl font-bold mb-6">Start Your DevOps Journey</h2>
            <p className="text-[var(--muted)] text-lg mb-8 max-w-2xl mx-auto">
              JumpToTech provides hands-on labs and real-world projects to equip you with the essential skills for a successful DevOps career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/modules" className="bg-[#185FA5] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#185FA5]/90 transition inline-flex items-center justify-center">
                Explore Courses
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
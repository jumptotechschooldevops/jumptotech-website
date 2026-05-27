import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Server, Activity, Shield, ArrowRight } from "lucide-react";

export default function SREPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
              Site Reliability Engineering (SRE)
            </h1>
            <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
              SRE applies software engineering principles to operations and infrastructure. Learn how to build and maintain highly reliable and scalable software systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <Activity className="text-[#185FA5] w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Monitoring & Observability</h3>
              <p className="text-[var(--muted)]">
                Implement comprehensive monitoring, alerting, and logging to gain deep visibility into system performance and rapidly identify issues.
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <Server className="text-[#1D9E75] w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Scalability</h3>
              <p className="text-[var(--muted)]">
                Design and operate systems that can handle exponential growth. Learn capacity planning, load balancing, and auto-scaling techniques.
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <Shield className="text-yellow-500 w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Reliability</h3>
              <p className="text-[var(--muted)]">
                Establish Service Level Objectives (SLOs) and Error Budgets. Use incident response practices and postmortems to continuously improve reliability.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#185FA5]/10 to-[#1D9E75]/10 rounded-3xl p-10 md:p-16 text-center border border-[var(--border)]">
            <h2 className="text-3xl font-bold mb-6">Ready to Master SRE?</h2>
            <p className="text-[var(--muted)] text-lg mb-8 max-w-2xl mx-auto">
              Our comprehensive curriculum covers Linux, Networking, Cloud Infrastructure, Kubernetes, and more. Start your journey to becoming a Site Reliability Engineer today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/modules" className="bg-[#185FA5] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#185FA5]/90 transition inline-flex items-center justify-center">
                Explore Curriculum
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/roadmap" className="bg-[var(--card-bg)] text-[var(--foreground)] border border-[var(--border)] px-8 py-3 rounded-xl font-medium hover:bg-[var(--hover-bg)] transition inline-flex items-center justify-center">
                View Career Roadmap
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
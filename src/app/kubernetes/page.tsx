import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Container, Settings, Network, ArrowRight } from "lucide-react";

export default function KubernetesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
              Kubernetes (K8s)
            </h1>
            <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
              Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <Container className="text-[#185FA5] w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Container Orchestration</h3>
              <p className="text-[var(--muted)]">
                Manage the lifecycle of containers across a cluster of nodes. Automatically handle failures and restarts.
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <Settings className="text-[#1D9E75] w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Declarative Configuration</h3>
              <p className="text-[var(--muted)]">
                Define the desired state of your applications using YAML or JSON. K8s continuously ensures the actual state matches the desired state.
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <Network className="text-yellow-500 w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Service Discovery & Scaling</h3>
              <p className="text-[var(--muted)]">
                Expose containers using DNS or IP addresses. Automatically scale applications based on CPU usage or custom metrics.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#185FA5]/10 to-[#1D9E75]/10 rounded-3xl p-10 md:p-16 text-center border border-[var(--border)]">
            <h2 className="text-3xl font-bold mb-6">Master Kubernetes</h2>
            <p className="text-[var(--muted)] text-lg mb-8 max-w-2xl mx-auto">
              From Pods to Deployments, Ingress to StatefulSets, our curriculum covers the essential K8s concepts every DevOps engineer needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/modules" className="bg-[#185FA5] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#185FA5]/90 transition inline-flex items-center justify-center">
                Explore Curriculum
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
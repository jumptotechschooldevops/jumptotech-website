import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Cloud, Lock, Database, ArrowRight } from "lucide-react";

export default function AWSPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
              Amazon Web Services (AWS)
            </h1>
            <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
              AWS is the world&apos;s most comprehensive and broadly adopted cloud platform. Master the foundational services that power modern infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <Cloud className="text-[#185FA5] w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Compute & Networking</h3>
              <p className="text-[var(--muted)]">
                Deploy scalable compute capacity with EC2. Design secure, logically isolated virtual networks using VPC.
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <Database className="text-[#1D9E75] w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Storage & Databases</h3>
              <p className="text-[var(--muted)]">
                Store and retrieve data globally with S3. Manage relational databases efficiently with RDS and DynamoDB.
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border)] p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <Lock className="text-yellow-500 w-12 h-12 mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Security & IAM</h3>
              <p className="text-[var(--muted)]">
                Securely manage access to AWS services and resources. Understand the shared responsibility model.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#185FA5]/10 to-[#1D9E75]/10 rounded-3xl p-10 md:p-16 text-center border border-[var(--border)]">
            <h2 className="text-3xl font-bold mb-6">Ready to Build in the Cloud?</h2>
            <p className="text-[var(--muted)] text-lg mb-8 max-w-2xl mx-auto">
              Learn AWS through practical, hands-on modules designed for aspiring DevOps engineers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/modules" className="bg-[#185FA5] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#185FA5]/90 transition inline-flex items-center justify-center">
                Start Learning AWS
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
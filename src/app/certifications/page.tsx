"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const certData = {
  aws: [
    { q: "What is an S3 bucket?", a: "Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance." },
    { q: "What is the difference between EC2 and ECS?", a: "EC2 is a virtual machine, whereas ECS is a container management service that runs your containers on a cluster of EC2 instances." },
  ],
  terraform: [
    { q: "What is Terraform state?", a: "Terraform must store state about your managed infrastructure and configuration. This state is used by Terraform to map real world resources to your configuration." },
    { q: "How do you run Terraform?", a: "You run 'terraform init', followed by 'terraform plan' to see changes, and 'terraform apply' to execute them." },
  ],
  cka: [
    { q: "What is a Pod in Kubernetes?", a: "A Pod is the smallest, most basic deployable object in Kubernetes. A Pod represents a single instance of a running process in your cluster." },
    { q: "How do you expose a Deployment?", a: "You can expose a deployment by creating a Service object that targets the deployment's pods, e.g., 'kubectl expose deployment my-dep --port=80'." },
  ]
};

export default function CertificationsPage() {
  const { t } = useLanguage();
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 min-h-screen">
      <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
        {t("Certifications Q&A", "Вопросы и ответы по сертификации")}
      </h1>
      <p className="text-[var(--muted)] mb-12">
        {t("Prepare for your AWS, Terraform, and CKA certifications with these practice questions.", "Подготовьтесь к сертификациям AWS, Terraform и CKA с помощью этих практических вопросов.")}
      </p>

      <div className="space-y-12">
        {/* AWS */}
        <div>
          <h2 className="text-2xl font-semibold text-[#185FA5] mb-6 border-b border-[var(--border)] pb-2">AWS Certified Solutions Architect</h2>
          <div className="space-y-4">
            {certData.aws.map((item, idx) => (
              <div key={`aws-${idx}`} className="border border-[var(--border)] rounded-xl bg-[var(--card-bg)] overflow-hidden">
                <button
                  className="w-full text-left px-6 py-4 flex justify-between items-center font-medium hover:bg-[var(--muted-bg)] transition-colors"
                  onClick={() => toggleItem(`aws-${idx}`)}
                >
                  <span className="text-[var(--foreground)] pr-4">{item.q}</span>
                  <ChevronDown className={`shrink-0 text-[var(--muted)] transition-transform ${openItem === `aws-${idx}` ? "rotate-180" : ""}`} size={20} />
                </button>
                {openItem === `aws-${idx}` && (
                  <div className="px-6 py-4 text-sm text-[var(--muted)] bg-[var(--background)] border-t border-[var(--border)]">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Terraform */}
        <div>
          <h2 className="text-2xl font-semibold text-[#1D9E75] mb-6 border-b border-[var(--border)] pb-2">HashiCorp Certified: Terraform Associate</h2>
          <div className="space-y-4">
            {certData.terraform.map((item, idx) => (
              <div key={`tf-${idx}`} className="border border-[var(--border)] rounded-xl bg-[var(--card-bg)] overflow-hidden">
                <button
                  className="w-full text-left px-6 py-4 flex justify-between items-center font-medium hover:bg-[var(--muted-bg)] transition-colors"
                  onClick={() => toggleItem(`tf-${idx}`)}
                >
                  <span className="text-[var(--foreground)] pr-4">{item.q}</span>
                  <ChevronDown className={`shrink-0 text-[var(--muted)] transition-transform ${openItem === `tf-${idx}` ? "rotate-180" : ""}`} size={20} />
                </button>
                {openItem === `tf-${idx}` && (
                  <div className="px-6 py-4 text-sm text-[var(--muted)] bg-[var(--background)] border-t border-[var(--border)]">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CKA */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-500 mb-6 border-b border-[var(--border)] pb-2">Certified Kubernetes Administrator (CKA)</h2>
          <div className="space-y-4">
            {certData.cka.map((item, idx) => (
              <div key={`cka-${idx}`} className="border border-[var(--border)] rounded-xl bg-[var(--card-bg)] overflow-hidden">
                <button
                  className="w-full text-left px-6 py-4 flex justify-between items-center font-medium hover:bg-[var(--muted-bg)] transition-colors"
                  onClick={() => toggleItem(`cka-${idx}`)}
                >
                  <span className="text-[var(--foreground)] pr-4">{item.q}</span>
                  <ChevronDown className={`shrink-0 text-[var(--muted)] transition-transform ${openItem === `cka-${idx}` ? "rotate-180" : ""}`} size={20} />
                </button>
                {openItem === `cka-${idx}` && (
                  <div className="px-6 py-4 text-sm text-[var(--muted)] bg-[var(--background)] border-t border-[var(--border)]">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

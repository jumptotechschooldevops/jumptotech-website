import { modules } from "@/lib/data";
import { ModulePageClient } from "./ModulePageClient";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = modules.find((m) => m.slug === slug);
  if (!mod) return {};
  return {
    title: `${mod.title} — JumpToTech DevOps School`,
    description: mod.description,
  };
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = modules.find((m) => m.slug === slug);
  if (!mod) notFound();
  return <ModulePageClient module={mod} />;
}

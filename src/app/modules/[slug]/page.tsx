import { ModulePageClient } from "./ModulePageClient";

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ModulePageClient initialModuleSlug={slug} />;
}

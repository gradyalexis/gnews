import { getSources } from "@/lib/newsapi";
import { Globe, Newspaper, ChevronRight } from "lucide-react";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

const categoryColors: Record<string, string> = {
  business: "bg-blue-500/10 text-blue-300 ring-1 ring-blue-500/20",
  entertainment: "bg-purple-500/10 text-purple-300 ring-1 ring-purple-500/20",
  health: "bg-green-500/10 text-green-300 ring-1 ring-green-500/20",
  science: "bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/20",
  sports: "bg-orange-500/10 text-orange-300 ring-1 ring-orange-500/20",
  technology: "bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/20",
  general: "bg-white/5 text-zinc-300 ring-1 ring-white/10",
};

function getCategoryColor(category: string) {
  return (
    categoryColors[category.toLowerCase()] ||
    "bg-white/5 text-zinc-300 ring-1 ring-white/10"
  );
}

export default async function SourcesPage() {
  let sourcesData;
  try {
    sourcesData = await getSources();
  } catch (error) {
    console.error("Failed to fetch sources:", error);
    sourcesData = { status: "error", sources: [] };
  }

  const sources = sourcesData.sources || [];

  const categories = [...new Set(sources.map((s) => s.category))].sort();

  return (
    <div className="flex flex-1 flex-col pt-24 md:pt-28">
      <section className="relative px-4 pb-12 pt-8 sm:px-6 md:pb-16">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-md">
              <Globe className="h-3 w-3 text-white/40" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
                Global Network
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-white">
              Sources
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm font-light tracking-wide text-white/40">
              {sources.length > 0 ? `Browse ${sources.length} curated sources from around the world` : "News sources from trusted outlets worldwide"}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {sources.length === 0 ? (
          <AnimatedSection>
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/[0.06] bg-white/[0.02] py-24 backdrop-blur-md">
              <p className="font-[family-name:var(--font-playfair)] text-lg font-medium text-white/80">
                Unable to load sources
              </p>
              <p className="mt-1 text-sm text-white/30">
                Please try again later
              </p>
            </div>
          </AnimatedSection>
        ) : (
          <div className="space-y-16">
            {categories.map((category) => {
              const categorySources = sources.filter(
                (s) => s.category === category
              );
              return (
                <section key={category}>
                  <AnimatedSection className="mb-6 flex items-end justify-between border-b border-white/[0.06] pb-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${getCategoryColor(
                          category
                        )}`}
                      >
                        {category}
                      </span>
                      <span className="text-xs text-white/30">
                        {categorySources.length} sources
                      </span>
                    </div>
                  </AnimatedSection>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {categorySources.map((source) => (
                      <Link
                        key={source.id}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm transition-all hover:bg-white/[0.05] hover:border-white/[0.10]"
                      >
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-white/30">
                          <Newspaper className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="truncate text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                              {source.name}
                            </h3>
                            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-white/20 transition-all group-hover:text-white/40 group-hover:translate-x-0.5" />
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/35">
                            {source.description}
                          </p>
                          <div className="mt-2.5 flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/25">
                            <span>{source.language}</span>
                            <span className="text-white/10">·</span>
                            <span>{source.country}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

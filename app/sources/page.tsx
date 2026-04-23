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
    <div className="flex flex-1 flex-col">
      <section className="border-b border-white/10 py-10 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-zinc-300" />
              <h1 className="text-3xl font-bold tracking-tight text-white">
                News Sources
              </h1>
            </div>
            <p className="mt-2 max-w-2xl text-lg text-zinc-400">
              Browse all {sources.length} news sources available through our platform
            </p>
          </AnimatedSection>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {sources.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-24 backdrop-blur-md">
            <p className="text-lg font-medium text-white">
              Unable to load sources
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              Please try again later
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map((category) => {
              const categorySources = sources.filter(
                (s) => s.category === category
              );
              return (
                <section key={category}>
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getCategoryColor(
                        category
                      )}`}
                    >
                      {category}
                    </span>
                    <span className="text-sm text-zinc-400">
                      {categorySources.length} sources
                    </span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {categorySources.map((source) => (
                      <Link
                        key={source.id}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10 text-zinc-300">
                          <Newspaper className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="truncate text-sm font-semibold text-white group-hover:text-zinc-200">
                              {source.name}
                            </h3>
                            <ChevronRight className="h-4 w-4 flex-shrink-0 text-zinc-500 transition-transform group-hover:translate-x-0.5" />
                          </div>
                          <p className="mt-0.5 line-clamp-2 text-xs text-zinc-400">
                            {source.description}
                          </p>
                          <div className="mt-2 flex items-center gap-2 text-xs text-zinc-500">
                            <span className="uppercase">{source.language}</span>
                            <span>·</span>
                            <span className="uppercase">{source.country}</span>
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

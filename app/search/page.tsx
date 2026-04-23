import { Suspense } from "react";
import { getEverything } from "@/lib/newsapi";
import NewsCard from "@/components/NewsCard";
import SearchBar from "@/components/SearchBar";
import { SearchX } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || "";

  let results;
  if (query) {
    try {
      results = await getEverything({
        q: query,
        pageSize: 24,
        sortBy: "relevancy",
      });
    } catch (error) {
      console.error("Search failed:", error);
      results = { status: "error", totalResults: 0, articles: [] };
    }
  } else {
    results = { status: "ok", totalResults: 0, articles: [] };
  }

  const articles = results.articles || [];

  return (
    <div className="flex flex-1 flex-col pt-24 md:pt-28">
      <section className="relative px-4 pb-12 pt-8 sm:px-6 md:pb-16">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-8 text-center">
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-white">
              Search
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm font-light tracking-wide text-white/40">
              Discover stories across millions of articles from trusted sources worldwide.
            </p>
          </AnimatedSection>
          <div className="mx-auto flex max-w-lg justify-center">
            <SearchBar initialQuery={query} />
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {query && (
          <AnimatedSection className="mb-8 flex items-end justify-between border-b border-white/[0.06] pb-4">
            <div>
              <span className="mb-1 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/30">
                Search Results
              </span>
              <p className="text-sm text-white/60">
                for <span className="font-medium text-white/90">"{query}"</span>
              </p>
            </div>
            <span className="mb-1 text-xs font-light text-white/30">
              {results.totalResults?.toLocaleString()} found
            </span>
          </AnimatedSection>
        )}

        {articles.length === 0 ? (
          <AnimatedSection>
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/[0.06] bg-white/[0.02] py-24 backdrop-blur-md">
              {query ? (
                <>
                  <SearchX className="mb-4 h-10 w-10 text-white/20" />
                  <p className="font-[family-name:var(--font-playfair)] text-lg font-medium text-white/80">
                    No results found
                  </p>
                  <p className="mt-1 text-sm text-white/30">
                    Try a different search term
                  </p>
                </>
              ) : (
                <>
                  <p className="font-[family-name:var(--font-playfair)] text-lg font-medium text-white/80">
                    Enter a search term
                  </p>
                  <p className="mt-1 text-sm text-white/30">
                    Search across millions of news articles worldwide
                  </p>
                </>
              )}
            </div>
          </AnimatedSection>
        ) : (
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <StaggerItem key={`${article.url}-${index}`}>
                <NewsCard
                  title={article.title}
                  description={article.description}
                  url={article.url}
                  urlToImage={article.urlToImage}
                  publishedAt={article.publishedAt}
                  source={article.source.name}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </main>
    </div>
  );
}

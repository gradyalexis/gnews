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
    <div className="flex flex-1 flex-col">
      <section className="border-b border-white/10 py-10 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h1 className="mb-6 text-3xl font-bold tracking-tight text-white">
              Search News
            </h1>
            <SearchBar initialQuery={query} />
          </AnimatedSection>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {query && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-zinc-400">
              Results for <span className="font-semibold text-white">"{query}"</span>
            </p>
            <span className="text-sm text-zinc-400">
              {results.totalResults?.toLocaleString()} found
            </span>
          </div>
        )}

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-24 backdrop-blur-md">
            {query ? (
              <>
                <SearchX className="mb-4 h-12 w-12 text-zinc-500" />
                <p className="text-lg font-medium text-white">
                  No results found
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Try a different search term
                </p>
              </>
            ) : (
              <>
                <p className="text-lg font-medium text-white">
                  Enter a search term to find articles
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Search across millions of news articles worldwide
                </p>
              </>
            )}
          </div>
        ) : (
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

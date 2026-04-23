import { Suspense } from "react";
import { unstable_noStore } from "next/cache";
import { getTopHeadlines } from "@/lib/newsapi";
import HeroCard from "@/components/HeroCard";
import NewsCard from "@/components/NewsCard";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import AnimatedSection from "@/components/AnimatedSection";
import StaggerContainer, { StaggerItem } from "@/components/StaggerContainer";

interface HomePageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  unstable_noStore();
  const params = await searchParams;
  const category = params.category;

  let newsData;
  try {
    newsData = await getTopHeadlines({
      country: "us",
      category,
      pageSize: 12,
    });
  } catch (error) {
    console.error("Failed to fetch news:", error);
    newsData = { status: "error", totalResults: 0, articles: [] };
  }

  const articles = newsData.articles || [];
  const hasMultipleArticles = articles.length > 1;
  const heroArticle = hasMultipleArticles ? articles[0] : null;
  const gridArticles = hasMultipleArticles ? articles.slice(1) : articles;

  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b border-white/10 py-12 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-8 text-center">
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl drop-shadow-lg">
              Stay informed with the latest news
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-zinc-300">
              Curated headlines from trusted sources around the world
            </p>
          </AnimatedSection>
          <div className="mx-auto flex max-w-2xl justify-center">
            <SearchBar />
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={null}>
          <div className="mb-8">
            <CategoryFilter />
          </div>
        </Suspense>

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-24 backdrop-blur-md">
            <p className="text-lg font-medium text-white">
              No articles found
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              Try selecting a different category or check back later
            </p>
          </div>
        ) : (
          <div key={category || "all"}>
            {heroArticle && (
              <AnimatedSection delay={0.1} className="mb-8">
                <HeroCard
                  title={heroArticle.title}
                  description={heroArticle.description}
                  url={heroArticle.url}
                  urlToImage={heroArticle.urlToImage}
                  publishedAt={heroArticle.publishedAt}
                  source={heroArticle.source.name}
                />
              </AnimatedSection>
            )}

            <AnimatedSection delay={0.2} className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight text-white">
                Latest Headlines
              </h2>
              <span className="text-sm text-zinc-400">
                {newsData.totalResults?.toLocaleString()} results
              </span>
            </AnimatedSection>

            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gridArticles.map((article, index) => (
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
          </div>
        )}
      </main>
    </div>
  );
}

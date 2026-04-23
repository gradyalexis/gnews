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
    <div className="flex flex-1 flex-col pt-24 md:pt-28">
      {/* Hero Section */}
      <section className="relative px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-20">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mb-12 text-center md:mb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400/80" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
                Live Headlines
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-white">
              The Stories<br />
              <span className="text-white/40">That Matter</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-sm font-light leading-relaxed tracking-wide text-white/40">
              Curated journalism from the world's most trusted sources.
              Brought to life through immersive design.
            </p>
          </AnimatedSection>
          <div className="mx-auto flex max-w-md justify-center">
            <SearchBar />
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={null}>
          <div className="mb-10">
            <CategoryFilter />
          </div>
        </Suspense>

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/[0.06] bg-white/[0.02] py-24 backdrop-blur-md">
            <p className="text-lg font-medium text-white/80">
              No articles found
            </p>
            <p className="mt-1 text-sm text-white/30">
              Try selecting a different category or check back later
            </p>
          </div>
        ) : (
          <div key={category || "all"} className="space-y-16">
            {heroArticle && (
              <AnimatedSection delay={0.1}>
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

            <div>
              <AnimatedSection delay={0.15} className="mb-8 flex items-end justify-between border-b border-white/[0.06] pb-4">
                <div>
                  <span className="mb-1 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/30">
                    Editorial
                  </span>
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-white md:text-3xl">
                    Latest Headlines
                  </h2>
                </div>
                <span className="mb-1 text-xs font-light text-white/30">
                  {newsData.totalResults?.toLocaleString()} stories
                </span>
              </AnimatedSection>

              <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
          </div>
        )}
      </main>
    </div>
  );
}

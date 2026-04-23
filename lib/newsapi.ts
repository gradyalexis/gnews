const BASE_URL = process.env.NEWS_BASE_URL || "https://newsapi.org/v2";
const API_KEY = process.env.NEWS_API_KEY;

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsSource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface SourcesApiResponse {
  status: string;
  sources: NewsSource[];
}

async function fetchNewsApi<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!API_KEY) {
    throw new Error("NEWS_API_KEY is not configured");
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append("apiKey", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString(), {
    next: { revalidate: 300 }, // Revalidate every 5 minutes
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `NewsAPI error: ${response.status}`);
  }

  return response.json();
}

export async function getTopHeadlines(params: {
  country?: string;
  category?: string;
  sources?: string;
  q?: string;
  pageSize?: number;
  page?: number;
} = {}): Promise<NewsApiResponse> {
  return fetchNewsApi<NewsApiResponse>("/top-headlines", {
    country: params.country || "us",
    category: params.category || "",
    sources: params.sources || "",
    q: params.q || "",
    pageSize: String(params.pageSize || 20),
    page: String(params.page || 1),
  });
}

export async function getEverything(params: {
  q?: string;
  sources?: string;
  domains?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: string;
  pageSize?: number;
  page?: number;
} = {}): Promise<NewsApiResponse> {
  return fetchNewsApi<NewsApiResponse>("/everything", {
    q: params.q || "news",
    sources: params.sources || "",
    domains: params.domains || "",
    from: params.from || "",
    to: params.to || "",
    language: params.language || "en",
    sortBy: params.sortBy || "publishedAt",
    pageSize: String(params.pageSize || 20),
    page: String(params.page || 1),
  });
}

export async function getSources(params: {
  category?: string;
  language?: string;
  country?: string;
} = {}): Promise<SourcesApiResponse> {
  return fetchNewsApi<SourcesApiResponse>("/sources", {
    category: params.category || "",
    language: params.language || "",
    country: params.country || "",
  });
}

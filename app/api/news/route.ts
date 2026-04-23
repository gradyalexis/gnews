import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEWS_BASE_URL || "https://newsapi.org/v2";
const API_KEY = process.env.NEWS_API_KEY;

export async function GET(request: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: "NEWS_API_KEY is not configured" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get("endpoint") || "top-headlines";
  
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.append("apiKey", API_KEY);
  
  // Copy all query params except endpoint
  searchParams.forEach((value, key) => {
    if (key !== "endpoint") {
      url.searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(url.toString());
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "NewsAPI request failed" },
        { status: response.status }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news data" },
      { status: 500 }
    );
  }
}

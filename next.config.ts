import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  env: {
    NEWS_BASE_URL: process.env.NEWS_BASE_URL,
    NEWS_API_KEY: process.env.NEWS_API_KEY,
  },
};

export default nextConfig;

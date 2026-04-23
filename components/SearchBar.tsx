"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  initialQuery?: string;
  className?: string;
}

export default function SearchBar({ initialQuery = "", className }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative w-full max-w-xl", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 transition-colors focus-within:text-white/50" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
          className="h-11 w-full rounded-full border border-white/[0.08] bg-white/[0.04] pl-11 pr-5 text-sm font-light tracking-wide text-white shadow-lg shadow-black/5 backdrop-blur-xl transition-all placeholder:text-white/25 focus:border-white/20 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-white/10"
        />
      </div>
    </form>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const categories = [
  { id: "", label: "All" },
  { id: "business", label: "Business" },
  { id: "entertainment", label: "Entertainment" },
  { id: "health", label: "Health" },
  { id: "science", label: "Science" },
  { id: "sports", label: "Sports" },
  { id: "technology", label: "Technology" },
];

interface CategoryFilterProps {
  className?: string;
}

export default function CategoryFilter({ className }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId) {
      router.push(`/?category=${categoryId}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategoryChange(cat.id)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-all backdrop-blur-sm",
            activeCategory === cat.id
              ? "bg-white/20 text-white shadow-lg shadow-white/5 ring-1 ring-white/30"
              : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white hover:border-white/20"
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

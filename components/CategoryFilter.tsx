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
    <div className={cn("-mx-4 overflow-x-auto px-4 scrollbar-hide", className)}>
      <div className="flex items-center gap-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={cn(
              "relative whitespace-nowrap px-4 py-2 text-[13px] font-medium tracking-wide transition-colors",
              activeCategory === cat.id ? "text-white" : "text-white/40 hover:text-white/70"
            )}
          >
            {cat.label}
            {activeCategory === cat.id && (
              <span className="absolute bottom-0 left-2 right-2 h-px bg-white/60" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

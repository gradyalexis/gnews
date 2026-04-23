"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NewsCardProps {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: string;
  variant?: "default" | "compact" | "featured";
  className?: string;
}

export default function NewsCard({
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  source,
  variant = "default",
  className,
}: NewsCardProps) {
  const date = new Date(publishedAt);

  if (variant === "compact") {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-3.5 backdrop-blur-sm transition-all hover:border-white/[0.12] hover:bg-white/[0.06]",
          className
        )}
      >
        {urlToImage && (
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl">
            <Image src={urlToImage} alt={title} fill className="object-cover" sizes="64px" />
          </div>
        )}
        <div className="flex flex-col justify-center gap-1 overflow-hidden">
          <h3 className="line-clamp-2 text-sm font-medium text-white/90">{title}</h3>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>{source}</span>
            <span className="text-white/20">·</span>
            <span>{format(date, "MMM d")}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/[0.12]",
          className
        )}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {urlToImage ? (
            <Image
              src={urlToImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/[0.03]">
              <span className="text-sm text-white/30">No image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-white/70 backdrop-blur-sm">
                {source}
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold leading-tight text-white sm:text-xl lg:text-2xl">
              {title}
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xs text-white/50">
              <Calendar className="h-3 w-3" />
              <span>{format(date, "MMM d, yyyy")}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default editorial card
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn("group", className)}
    >
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4]">
          {urlToImage ? (
            <motion.div
              className="relative h-full w-full"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Image
                src={urlToImage}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/[0.03]">
              <span className="text-sm text-white/25">No image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/60 backdrop-blur-md">
                {source}
              </span>
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-white/40">
                <Calendar className="h-3 w-3" />
                {format(date, "MMM d")}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold leading-snug text-white/95 group-hover:text-white transition-colors">
              {title}
            </h3>
            {description && (
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/40">
                {description}
              </p>
            )}
          </div>
          <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/20 opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-3.5 w-3.5 text-white/70" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

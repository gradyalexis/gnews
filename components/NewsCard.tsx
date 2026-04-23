"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ExternalLink } from "lucide-react";
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
          "group flex gap-4 rounded-xl border border-zinc-200 bg-white p-3 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700",
          className
        )}
      >
        {urlToImage && (
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={urlToImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="80px"
            />
          </div>
        )}
        <div className="flex flex-col justify-center gap-1 overflow-hidden">
          <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 dark:text-white">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-medium">{source}</span>
            <span>·</span>
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
          "group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900",
          className
        )}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {urlToImage ? (
            <Image
              src={urlToImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
              <span className="text-sm text-zinc-400">No image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                {source}
              </span>
            </div>
            <h2 className="text-lg font-bold leading-tight text-white sm:text-xl lg:text-2xl">
              {title}
            </h2>
            <div className="mt-2 flex items-center gap-2 text-xs text-zinc-300">
              <Calendar className="h-3 w-3" />
              <span>{format(date, "MMM d, yyyy")}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-300">
            {description || "No description available"}
          </p>
          <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0 text-zinc-400 transition-colors group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
        </div>
      </Link>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/80 backdrop-blur-md transition-all hover:shadow-2xl hover:shadow-black/10 dark:border-zinc-700/50 dark:bg-zinc-900/80 dark:hover:shadow-black/30",
          className
        )}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {urlToImage ? (
            <motion.div
              className="relative h-full w-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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
            <div className="flex h-full w-full items-center justify-center bg-zinc-100/80 dark:bg-zinc-800/80">
              <span className="text-sm text-zinc-400">No image available</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="rounded bg-zinc-100/80 px-1.5 py-0.5 font-medium dark:bg-zinc-800/80">
              {source}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {format(date, "MMM d, yyyy")}
            </span>
          </div>
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-zinc-900 group-hover:text-zinc-700 dark:text-white dark:group-hover:text-zinc-300">
            {title}
          </h3>
          <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
            {description || "No description available"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

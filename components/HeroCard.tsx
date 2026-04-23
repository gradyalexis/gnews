"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface HeroCardProps {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: string;
}

export default function HeroCard({
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  source,
}: HeroCardProps) {
  const date = new Date(publishedAt);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl transition-all hover:shadow-2xl hover:shadow-black/20 lg:flex-row"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:w-3/5">
          {urlToImage ? (
            <motion.div
              className="relative h-full w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={urlToImage}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </motion.div>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-100/20">
              <span className="text-sm text-zinc-400">No image available</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              Top Story
            </span>
            <span className="text-xs font-medium text-zinc-300">
              {source}
            </span>
          </div>
          <h1 className="mb-3 text-2xl font-bold leading-tight text-white transition-colors group-hover:text-zinc-200 sm:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="mb-6 line-clamp-3 text-base leading-relaxed text-zinc-300">
            {description || "No description available"}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Calendar className="h-4 w-4" />
              <span>{format(date, "MMMM d, yyyy")}</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-white transition-transform group-hover:translate-x-1">
              Read more <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowUpRight } from "lucide-react";
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
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="group"
    >
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex w-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-colors hover:border-white/[0.12] lg:flex-row lg:max-h-[540px]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:w-[62%]">
          {urlToImage ? (
            <motion.div
              className="relative h-full w-full"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
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
            <div className="flex h-full w-full items-center justify-center bg-white/[0.03]">
              <span className="text-sm text-white/30">No image available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/40" />
        </div>

        <div className="relative flex flex-1 flex-col justify-end p-6 sm:p-8 lg:justify-center lg:p-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/60 backdrop-blur-md">
              Top Story
            </span>
            <span className="h-px w-6 bg-white/20" />
            <span className="text-xs font-medium uppercase tracking-wider text-white/40">
              {source}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold leading-[1.15] text-white sm:text-3xl lg:text-[2.75rem] lg:leading-[1.1]">
            {title}
          </h1>

          {description && (
            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-white/50 sm:text-base lg:max-w-md">
              {description}
            </p>
          )}

          <div className="mt-6 flex items-center justify-between lg:mt-8">
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Calendar className="h-3.5 w-3.5" />
              <span className="uppercase tracking-wider">{format(date, "MMMM d, yyyy")}</span>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all group-hover:bg-white/10 group-hover:border-white/20">
              <ArrowUpRight className="h-4 w-4 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/sources", label: "Sources" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 md:top-6">
      <nav className="flex h-14 items-center justify-between rounded-full border border-white/[0.08] bg-black/30 px-5 backdrop-blur-2xl md:h-[3.25rem] md:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="font-[family-name:var(--font-playfair)] text-lg font-bold italic tracking-tight text-white/90 transition-colors group-hover:text-white">
            GNews
          </span>
          <span className="hidden h-px w-8 bg-white/20 md:block" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3 py-1.5 text-[13px] font-medium tracking-wide text-white/50 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-all hover:bg-white/10 hover:text-white"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-all hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "overflow-hidden rounded-2xl border border-white/[0.08] bg-black/50 backdrop-blur-2xl transition-all duration-500 md:hidden",
          mobileMenuOpen ? "mt-2 max-h-64 opacity-100" : "mt-0 max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-0.5 p-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

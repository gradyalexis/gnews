import Link from "next/link";
import { Newspaper, Globe, Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white ring-1 ring-white/20">
              <Newspaper className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              GNews
            </span>
          </div>

          <nav className="flex items-center gap-6 text-sm text-zinc-400">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <Link href="/search" className="transition-colors hover:text-white">
              Search
            </Link>
            <Link href="/sources" className="transition-colors hover:text-white">
              Sources
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-zinc-500 transition-colors hover:text-zinc-300"
              aria-label="Website"
            >
              <Globe className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-zinc-500 transition-colors hover:text-zinc-300"
              aria-label="Code"
            >
              <Code className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-xs text-zinc-500">
          <p>Powered by NewsAPI.org · Data provided for demonstration purposes</p>
        </div>
      </div>
    </footer>
  );
}

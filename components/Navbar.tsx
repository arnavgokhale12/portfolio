"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/siteConfig";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/70 backdrop-blur-xl">
      <nav className="container-wide flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold text-gray-100 hover:text-brand-400"
          aria-label={`${siteConfig.name} - Home`}
        >
          {siteConfig.name.split(" ").map((n) => n[0]).join("")}
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-8">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-brand-600 dark:hover:text-brand-400",
                    pathname === link.href ||
                      (link.href !== "/" && pathname.startsWith(link.href))
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-gray-600 dark:text-gray-400"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 border-l border-gray-200 pl-6 dark:border-gray-700">
            <kbd className="hidden rounded bg-gray-100 px-2 py-1 text-xs text-gray-500 lg:inline-block dark:bg-gray-800 dark:text-gray-400">
              ⌘K
            </kbd>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-gray-100 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-800 bg-gray-950 md:hidden">
          <ul className="container-wide space-y-1 py-4">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                    pathname === link.href ||
                      (link.href !== "/" && pathname.startsWith(link.href))
                      ? "bg-brand-900/30 text-brand-400"
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function AnimatedHero() {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-24 md:py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900/20 via-gray-950 to-purple-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

      <motion.div
        className="container-wide relative"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="max-w-4xl">
          {/* Status badge */}
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300 backdrop-blur-sm">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Open to opportunities
            </span>
          </motion.div>

          {/* Name with gradient */}
          <motion.h1
            variants={fadeInUp}
            className="mb-4 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            {siteConfig.name}
          </motion.h1>

          {/* Title with gradient text */}
          <motion.p
            variants={fadeInUp}
            className="mb-4 text-2xl font-semibold md:text-3xl"
          >
            <span className="bg-gradient-to-r from-brand-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {siteConfig.title}
            </span>
          </motion.p>

          {/* Short bio */}
          <motion.p
            variants={fadeInUp}
            className="mb-6 text-lg text-gray-400"
          >
            {siteConfig.shortBio}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            className="mb-8 text-lg text-gray-300 leading-relaxed max-w-2xl"
          >
            {siteConfig.description}
          </motion.p>

          {/* Tech stack pills */}
          <motion.div variants={fadeInUp} className="mb-10 flex flex-wrap gap-2">
            {siteConfig.techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="rounded-full border border-gray-700 bg-gray-800/50 px-3 py-1 text-sm text-gray-300 backdrop-blur-sm transition-colors hover:border-brand-500/50 hover:bg-brand-500/10"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="group inline-flex items-center rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-brand-500/25 transition-all hover:shadow-xl hover:shadow-brand-500/30 hover:-translate-y-0.5"
            >
              View Projects
              <svg
                className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border border-gray-600 bg-gray-800/50 px-6 py-3.5 font-semibold text-gray-200 backdrop-blur-sm transition-all hover:border-gray-500 hover:bg-gray-700/50 hover:-translate-y-0.5"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating gradient orbs */}
      <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
    </section>
  );
}

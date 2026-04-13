"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectMeta } from "@/types";
import { formatDate, cn } from "@/lib/utils";

interface AnimatedProjectCardProps {
  project: ProjectMeta;
  index?: number;
}

const categoryConfig: Record<string, { gradient: string; text: string; label: string; glow: string }> = {
  ml: {
    gradient: "from-purple-500/20 to-pink-500/20",
    text: "text-purple-300",
    label: "Machine Learning",
    glow: "group-hover:shadow-purple-500/20"
  },
  data: {
    gradient: "from-blue-500/20 to-cyan-500/20",
    text: "text-blue-300",
    label: "Data Analysis",
    glow: "group-hover:shadow-blue-500/20"
  },
  economics: {
    gradient: "from-green-500/20 to-emerald-500/20",
    text: "text-green-300",
    label: "Economics",
    glow: "group-hover:shadow-green-500/20"
  },
  engineering: {
    gradient: "from-orange-500/20 to-amber-500/20",
    text: "text-orange-300",
    label: "Engineering",
    glow: "group-hover:shadow-orange-500/20"
  },
};

export function AnimatedProjectCard({ project, index = 0 }: AnimatedProjectCardProps) {
  const category = categoryConfig[project.category] || {
    gradient: "from-gray-500/20 to-gray-600/20",
    text: "text-gray-300",
    label: project.category,
    glow: "group-hover:shadow-gray-500/20"
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/5 backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        "hover:border-white/20 hover:bg-white/10",
        "hover:shadow-2xl hover:-translate-y-1",
        category.glow
      )}
    >
      {/* Project thumbnail */}
      {project.image && (
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        </div>
      )}

      {/* Gradient overlay on hover */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none",
        category.gradient
      )} />

      {/* Category Badge */}
      <div className={cn("absolute left-4 z-10", project.image ? "top-4" : "top-4")}>
        <span
          className={cn(
            "rounded-full bg-gray-900/80 backdrop-blur-sm px-3 py-1 text-xs font-semibold border border-white/10",
            category.text
          )}
        >
          {category.label}
        </span>
      </div>

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-lg shadow-orange-500/30">
            Featured
          </span>
        </div>
      )}

      {/* Card Content */}
      <Link href={`/projects/${project.slug}`} className="relative flex flex-1 flex-col p-6 pt-14">
        <div className="flex-1">
          <h3 className="mb-3 text-xl font-bold text-gray-100 transition-colors group-hover:text-white">
            {project.title}
          </h3>
          <p className="mb-4 text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-gray-800/80 px-2 py-0.5 text-xs font-medium text-gray-300 border border-white/5"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="rounded-md bg-gray-800/80 px-2 py-0.5 text-xs font-medium text-gray-500">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <time className="text-xs text-gray-500" dateTime={project.date}>
            {formatDate(project.date)}
          </time>
          <span className="inline-flex items-center text-sm font-medium text-brand-400 transition-colors group-hover:text-brand-300">
            View case study
            <svg
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </Link>

      {/* External links */}
      {(project.links?.demo || project.links?.github) && (
        <div className="relative flex items-center gap-4 border-t border-white/10 px-6 py-3 bg-black/20">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 transition-colors hover:text-brand-300"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 transition-colors hover:text-gray-300"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

import Link from "next/link";
import { ProjectMeta } from "@/types";
import { formatDate } from "@/lib/utils";

interface CaseStudyLayoutProps {
  meta: ProjectMeta;
  children: React.ReactNode;
}

const categoryLabels: Record<string, string> = {
  ml: "Machine Learning",
  data: "Data Analysis",
  economics: "Economics",
  engineering: "Engineering",
};

export function CaseStudyLayout({ meta, children }: CaseStudyLayoutProps) {
  return (
    <article className="py-16">
      <div className="container-narrow">
        {/* Back link */}
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center text-sm font-medium text-gray-400 hover:text-brand-400"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to projects
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-brand-900/40 px-3 py-1 text-sm font-medium text-brand-300">
              {categoryLabels[meta.category] || meta.category}
            </span>
            <time className="text-sm text-gray-500" dateTime={meta.date}>
              {formatDate(meta.date)}
            </time>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-gray-100 md:text-4xl">
            {meta.title}
          </h1>

          <p className="text-xl text-gray-400">{meta.description}</p>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-gray-800 px-3 py-1 text-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          {meta.links && (meta.links.github || meta.links.demo || meta.links.paper) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {meta.links.demo && (
                <a
                  href={meta.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-700 hover:shadow-md"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Project Page
                </a>
              )}
              {meta.links.github && (
                <a
                  href={meta.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-300 transition-all hover:border-gray-600 hover:bg-gray-700"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              )}
              {meta.links.paper && (
                <a
                  href={meta.links.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-300 transition-all hover:border-gray-600 hover:bg-gray-700"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Paper
                </a>
              )}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose max-w-none">{children}</div>

        {/* Footer */}
        <footer className="mt-16 border-t border-gray-800 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/projects"
              className="inline-flex items-center text-sm font-medium text-brand-400 hover:text-brand-300"
            >
              <svg
                className="mr-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              View all projects
            </Link>
            <Link href="/contact" className="btn-primary">
              Get in touch
            </Link>
          </div>
        </footer>
      </div>
    </article>
  );
}

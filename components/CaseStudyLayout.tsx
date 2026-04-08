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
          className="mb-8 inline-flex items-center text-sm font-medium text-gray-600 hover:text-brand-600"
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
            <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-800">
              {categoryLabels[meta.category] || meta.category}
            </span>
            <time className="text-sm text-gray-500" dateTime={meta.date}>
              {formatDate(meta.date)}
            </time>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {meta.title}
          </h1>

          <p className="text-xl text-gray-600">{meta.description}</p>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="prose max-w-none">{children}</div>

        {/* Footer */}
        <footer className="mt-16 border-t border-gray-200 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/projects"
              className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700"
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

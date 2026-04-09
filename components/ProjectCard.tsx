import Link from "next/link";
import { ProjectMeta } from "@/types";
import { formatDate, cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectMeta;
}

const categoryConfig: Record<string, { bg: string; text: string; label: string }> = {
  ml: { bg: "bg-purple-900/40", text: "text-purple-300", label: "Machine Learning" },
  data: { bg: "bg-blue-900/40", text: "text-blue-300", label: "Data Analysis" },
  economics: { bg: "bg-green-900/40", text: "text-green-300", label: "Economics" },
  engineering: { bg: "bg-orange-900/40", text: "text-orange-300", label: "Engineering" },
};

export function ProjectCard({ project }: ProjectCardProps) {
  const category = categoryConfig[project.category] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
    label: project.category,
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 transition-all hover:border-gray-700 hover:shadow-lg hover:shadow-black/30">
      {/* Category Badge - Absolute positioned */}
      <div className="absolute top-4 left-4 z-10">
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            category.bg,
            category.text
          )}
        >
          {category.label}
        </span>
      </div>

      {/* Card Content */}
      <Link href={`/projects/${project.slug}`} className="flex flex-1 flex-col p-6 pt-14">
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-bold text-gray-100 group-hover:text-brand-400 transition-colors">
            {project.title}
          </h3>
          <p className="mb-4 text-sm text-gray-400 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-gray-800 px-2 py-0.5 text-xs font-medium text-gray-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="rounded-md bg-gray-800 px-2 py-0.5 text-xs font-medium text-gray-500">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-800 pt-4">
          <time className="text-xs text-gray-500" dateTime={project.date}>
            {formatDate(project.date)}
          </time>
          <span className="inline-flex items-center text-sm font-medium text-brand-400 group-hover:text-brand-300">
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

      {/* Project page link — shown outside the main card link to avoid nested <a> */}
      {project.links?.demo && (
        <div className="border-t border-gray-800 px-6 py-3">
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Project Page
          </a>
        </div>
      )}
    </article>
  );
}

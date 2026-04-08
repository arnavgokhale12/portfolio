import Link from "next/link";
import { ProjectMeta } from "@/types";
import { formatDate, cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectMeta;
}

const categoryConfig: Record<string, { bg: string; text: string; label: string }> = {
  ml: { bg: "bg-purple-100", text: "text-purple-700", label: "Machine Learning" },
  data: { bg: "bg-blue-100", text: "text-blue-700", label: "Data Analysis" },
  economics: { bg: "bg-green-100", text: "text-green-700", label: "Economics" },
  engineering: { bg: "bg-orange-100", text: "text-orange-700", label: "Engineering" },
};

export function ProjectCard({ project }: ProjectCardProps) {
  const category = categoryConfig[project.category] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
    label: project.category,
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-gray-300 hover:shadow-lg">
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
          <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
            {project.title}
          </h3>
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <time className="text-xs text-gray-500" dateTime={project.date}>
            {formatDate(project.date)}
          </time>
          <span className="inline-flex items-center text-sm font-medium text-brand-600 group-hover:text-brand-700">
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
    </article>
  );
}

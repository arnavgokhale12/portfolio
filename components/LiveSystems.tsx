import Link from "next/link";
import { ExternalLink, Radio, ShieldCheck } from "lucide-react";
import { ProjectMeta } from "@/types";
import { getLiveProjects, getProjectProof } from "@/lib/projectOps";

interface LiveSystemsProps {
  projects: ProjectMeta[];
}

export function LiveSystems({ projects }: LiveSystemsProps) {
  const liveProjects = getLiveProjects(projects);
  const visibleProjects = liveProjects.slice(0, 4);

  return (
    <section className="border-y border-gray-200 bg-white py-14 dark:border-white/10 dark:bg-gray-950">
      <div className="container-wide">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-300">
              <Radio className="h-4 w-4" />
              {liveProjects.length} live systems
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Deployed work, not just repo links
            </h2>
            <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
              These projects have live demos, case studies, and stack signals that
              make the portfolio easier to verify at a glance.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
          >
            View project operations
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {visibleProjects.map((project) => (
            <article
              key={project.slug}
              className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>
                <ShieldCheck className="h-4 w-4 text-gray-400" />
              </div>
              <h3 className="line-clamp-2 font-semibold text-gray-900 dark:text-gray-100">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {getProjectProof(project)}
              </p>
              <a
                href={project.links?.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
              >
                Open demo
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

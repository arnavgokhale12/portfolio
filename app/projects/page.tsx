import { Metadata } from "next";
import { ProjectList } from "@/components/ProjectList";
import { getAllProjects } from "@/lib/projects";
import { getLiveProjects } from "@/lib/projectOps";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of my work in data science, machine learning, and applied economics. Each project includes a case study with problem context, approach, and measurable results.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const liveProjects = getLiveProjects(projects);

  return (
    <div className="bg-gray-950 min-h-screen">
      {/* Header */}
      <section className="bg-gray-950 border-b border-gray-800">
        <div className="container-wide py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-400">
              Portfolio
            </p>
            <h1 className="mb-4 text-4xl font-bold text-gray-100 md:text-5xl">
              Projects
            </h1>
            <p className="text-xl text-gray-400">
              End-to-end systems I&apos;ve built—from data pipelines and ML models to
              mobile apps and dashboards. Each project includes context, approach,
              and outcomes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
                {liveProjects.length} live demos
              </span>
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300">
                {projects.length} case studies
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="container-wide">
          <ProjectList projects={projects} />
        </div>
      </section>
    </div>
  );
}

import { Metadata } from "next";
import { ProjectList } from "@/components/ProjectList";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of my work in data science, machine learning, and applied economics. Each project includes a case study with problem context, approach, and measurable results.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-wide py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-600">
              Portfolio
            </p>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Projects
            </h1>
            <p className="text-xl text-gray-600">
              End-to-end systems I&apos;ve built—from data pipelines and ML models to
              mobile apps and dashboards. Each project includes context, approach,
              and outcomes.
            </p>
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

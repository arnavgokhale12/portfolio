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
            <div className="mt-6">
              <a
                href="/showcase/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-100"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                View All Project Pages
              </a>
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

import Link from "next/link";
import { ProjectCard } from "@/components";
import { getFeaturedProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/siteConfig";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container-wide relative">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Open to opportunities
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="mb-4 text-xl text-brand-400 font-medium">
              {siteConfig.title}
            </p>
            <p className="mb-8 text-lg text-gray-300 leading-relaxed max-w-2xl">
              {siteConfig.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center rounded-lg bg-brand-500 px-6 py-3 font-medium text-white transition-all hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/25"
              >
                View Projects
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg border border-gray-600 bg-gray-800/50 px-6 py-3 font-medium text-gray-200 transition-all hover:border-gray-500 hover:bg-gray-700/50"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-gray-200 bg-white py-12">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">5+</div>
              <div className="mt-1 text-sm text-gray-500">Projects Shipped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">MS</div>
              <div className="mt-1 text-sm text-gray-500">Economics @ TAMU</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">Full Stack</div>
              <div className="mt-1 text-sm text-gray-500">Data to Deploy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">2026</div>
              <div className="mt-1 text-sm text-gray-500">Expected Grad</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-gray-50 py-20">
        <div className="container-wide">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
                Portfolio
              </p>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              View all projects
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">
              <p className="text-gray-500">
                Featured projects will appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20">
        <div className="container-narrow">
          <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 p-8 text-center md:p-12">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Let&apos;s Build Something Together
            </h2>
            <p className="mb-8 text-brand-100 max-w-lg mx-auto">
              I&apos;m open to internships, research collaborations, and full-time
              roles in data science, analytics, and applied economics.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/resume"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 font-medium text-brand-600 transition-all hover:bg-brand-50"
              >
                View Resume
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg border-2 border-white/30 px-6 py-3 font-medium text-white transition-all hover:bg-white/10"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

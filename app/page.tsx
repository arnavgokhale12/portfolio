import Link from "next/link";
import { AnimatedHero, AnimatedProjectCard, GitHubCalendar, CurrentlyWorkingOn, SpotifyReading } from "@/components";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 3);

  return (
    <>
      {/* Animated Hero Section */}
      <AnimatedHero />

      {/* Stats Section */}
      <section className="border-b border-gray-200 bg-gray-100 py-12 dark:border-white/10 dark:bg-gray-900/50">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">10+</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Projects Shipped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">MS</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Economics @ TAMU</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">Full Stack</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Data to Deploy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">2026</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Expected Grad</div>
            </div>
          </div>
        </div>
      </section>

      {/* Currently Working On */}
      <CurrentlyWorkingOn />

      {/* Featured Projects */}
      <section className="bg-gray-50 py-20 dark:bg-gray-950">
        <div className="container-wide">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Portfolio
              </p>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
            >
              View all projects
              <svg
                className="ml-1 h-4 w-4"
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
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <AnimatedProjectCard
                  key={project.slug}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-100 p-12 text-center dark:border-gray-700 dark:bg-gray-900">
              <p className="text-gray-500">
                Featured projects will appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* GitHub Activity Section */}
      <section className="bg-gray-100 py-16 dark:bg-gray-900">
        <div className="container-wide">
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Activity
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              GitHub Contributions
            </h2>
          </div>
          <GitHubCalendar username="arnavgokhale12" />
        </div>
      </section>

      {/* Spotify & Reading */}
      <SpotifyReading />

      {/* CTA Section */}
      <section className="bg-gray-50 py-20 dark:bg-gray-950">
        <div className="container-narrow">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-600 via-purple-600 to-pink-600 p-8 text-center md:p-12">
            {/* Glow effects */}
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Let&apos;s Build Something Together
              </h2>
              <p className="mb-8 text-white/80 max-w-lg mx-auto">
                I&apos;m open to internships, research collaborations, and full-time
                roles in software engineering, data science, and ML.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/resume"
                  className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-semibold text-brand-600 shadow-lg transition-all hover:bg-brand-50 hover:-translate-y-0.5"
                >
                  View Resume
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-xl border-2 border-white/30 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-0.5"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

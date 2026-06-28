import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Resume",
  description: `View and download ${siteConfig.name}'s resume.`,
};

const skills = [
  "Python", "SQL", "TypeScript", "JavaScript", "R", "MATLAB", "C++",
  "React", "Node.js", "Express", "pandas",
  "Apache Superset", "PostgreSQL", "Azure Blob Storage", "Tableau", "Microsoft Excel",
  "Git", "GitHub Actions", "Playwright", "Vitest",
];

export default function ResumePage() {
  return (
    <div className="bg-gray-950 min-h-screen">
      {/* Header */}
      <section className="bg-gray-950 border-b border-gray-800">
        <div className="container-wide py-12 md:py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-400">
                Resume
              </p>
              <h1 className="text-3xl font-bold text-gray-100 md:text-4xl">
                {siteConfig.name}
              </h1>
              <p className="mt-2 text-gray-400">
                Data Engineering &amp; Applied Economics
              </p>
            </div>
            <a
              href={siteConfig.resumePath}
              download
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-medium text-white transition-all hover:bg-brand-700 hover:shadow-lg"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Education */}
              <div className="rounded-2xl bg-gray-900 p-6 md:p-8 border border-gray-800">
                <h2 className="mb-6 flex items-center gap-3 text-lg font-bold text-gray-100">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </span>
                  Education
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-1 rounded-full bg-brand-500" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-semibold text-gray-100">M.S. Economics</h3>
                        <span className="text-sm font-medium text-brand-400">Dec 2026</span>
                      </div>
                      <p className="text-gray-400">Texas A&M University, College Station</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-1 rounded-full bg-gray-600" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-semibold text-gray-100">B.S. Electrical Engineering</h3>
                        <span className="text-sm text-gray-500">May 2025</span>
                      </div>
                      <p className="text-gray-400">Texas A&M University, College Station</p>
                      <p className="text-sm text-gray-500">Minor in Economics</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="rounded-2xl bg-gray-900 p-6 md:p-8 border border-gray-800">
                <h2 className="mb-6 flex items-center gap-3 text-lg font-bold text-gray-100">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  Work Experience
                </h2>
                <div className="space-y-8">
                  {[
                    {
                      title: "Data Engineer Intern",
                      company: "Southern Careers Institute, Austin, TX",
                      date: "May 2026 – Present",
                      accent: "bg-green-400",
                      bullets: [
                        "Engineered a CRM data pipeline — Azure Blob Storage → PostgreSQL → Apache Superset — processing 6,700+ leads and 50,000+ events with exact-match validation across 8 campuses.",
                        "Replaced 3-day manual Excel workflows with a production React 19 + TypeScript revenue-ops dashboard (SCI Flight Deck); iterated directly with CEO, CFO, and COO across 10+ campus locations.",
                        "Deployed 8+ embedded Superset BI dashboards with multi-tenant row-level security and guest-token access control per campus.",
                        "Cut dashboard load times 9–12× via PostgreSQL materialized views (1,405 ms → 157 ms) and BI query caching (5,498 ms → 607 ms).",
                        "Merged 120+ pull requests at 100% CI pass rate (482 unit tests, 222 Playwright E2E); triaged and resolved 28 of 33 security findings including credential exposure and auth fail-open bugs.",
                        "Shipped an AI assistant (Claude API, streaming, 3 model tiers) surfacing proactive enrollment and rep-performance insights within the dashboard.",
                      ],
                    },
                    {
                      title: "IT & Administrative Assistant",
                      company: "West Creek Dental, Austin, TX",
                      date: "Summer 2024",
                      accent: "bg-green-300",
                      bullets: [
                        "Provided general IT and hardware support across the clinic.",
                        "Coordinated with insurance providers to streamline claims processing.",
                      ],
                    },
                    {
                      title: "Engineering Intern",
                      company: "Silicon Labs, Austin, TX",
                      date: "Summer 2023",
                      accent: "bg-green-300",
                      bullets: [
                        "Built and tested circuits using soldering, breadboarding, and embedded programming.",
                        "Designed an LED Pattern Generator using an Atmel microcontroller.",
                      ],
                    },
                  ].map((job, i) => (
                    <div key={i} className="flex gap-4">
                      <div className={`flex-shrink-0 w-1 rounded-full ${job.accent}`} />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-semibold text-gray-100">{job.title}</h3>
                          <span className="text-sm text-gray-500">{job.date}</span>
                        </div>
                        <p className="text-sm text-gray-400">{job.company}</p>
                        <ul className="mt-2 space-y-1">
                          {job.bullets.map((bullet, j) => (
                            <li key={j} className="text-sm text-gray-400 flex gap-2">
                              <span className="text-gray-600 flex-shrink-0">•</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="rounded-2xl bg-gray-900 p-6 md:p-8 border border-gray-800">
                <h2 className="mb-6 flex items-center gap-3 text-lg font-bold text-gray-100">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </span>
                  Projects
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Supply Chain Stress Dashboard",
                      role: "Developer",
                      date: "2025 – Present",
                      bullets: [
                        "Built a FastAPI + SQLAlchemy backend ingesting 7 macroeconomic indicators (FRED, NY Fed GSCPI, Cass Freight Index, Baltic Dry, yfinance) into a dynamic composite stress index.",
                        "Applied Z-score normalization with a 36-month rolling window and regime classification (low / normal / elevated / crisis) to drive a Streamlit market-impact dashboard showing sector ETF and stock returns by supply chain regime.",
                      ],
                    },
                    {
                      title: "FoodFinder — Restaurant Discovery PWA",
                      role: "Developer",
                      date: "2025 – Present",
                      bullets: [
                        "Built a full-stack React + TypeScript + Express PWA querying OpenStreetMap (Overpass API) for currently-open restaurants; integrated OSRM batch routing for real-time drive/walk times on every pin.",
                        "Shipped with 11 filters, happy-hour detection from OSM tags, viewport-driven search, GPS re-centering, and offline installability — deployed on Vercel with a separate Express backend on Render.",
                      ],
                    },
                  ].map((project, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-1 rounded-full bg-purple-400" />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-semibold text-gray-100">{project.title}</h3>
                          <span className="text-sm text-gray-500">{project.date}</span>
                        </div>
                        <p className="text-sm text-purple-400 font-medium">{project.role}</p>
                        <ul className="mt-2 space-y-1">
                          {project.bullets.map((bullet, j) => (
                            <li key={j} className="text-sm text-gray-400 flex gap-2">
                              <span className="text-gray-600 flex-shrink-0">•</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills */}
              <div className="rounded-2xl bg-gray-900 p-6 border border-gray-800">
                <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="rounded-2xl bg-gray-900 p-6 border border-gray-800">
                <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Certifications
                </h3>
                <div>
                  <div className="font-semibold text-gray-100">Google Data Analytics</div>
                  <p className="text-sm text-gray-400">Professional Certificate · Aug 2025</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Data cleaning, visualization, SQL, R, and Tableau — end-to-end case studies on real-world analytics problems.
                  </p>
                </div>
              </div>

              {/* Leadership */}
              <div className="rounded-2xl bg-gray-900 p-6 border border-gray-800">
                <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Leadership
                </h3>
                <div>
                  <div className="font-semibold text-gray-100">Academic Chair</div>
                  <p className="text-sm text-gray-400">Phi Delta Theta</p>
                  <p className="text-sm text-gray-500">Fall 2021 – Fall 2024</p>
                  <ul className="mt-2 space-y-1">
                    <li className="text-sm text-gray-400 flex gap-2">
                      <span className="text-gray-600 flex-shrink-0">•</span>
                      Organized weekly study sessions for ~70 members across engineering and economics courses.
                    </li>
                    <li className="text-sm text-gray-400 flex gap-2">
                      <span className="text-gray-600 flex-shrink-0">•</span>
                      Raised chapter GPA by 0.75 points through structured schedules, exam calendars, and peer tutoring.
                    </li>
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-gradient-to-br from-gray-800 to-gray-700 p-6 text-white">
                <h3 className="mb-2 font-semibold">Want to work together?</h3>
                <p className="mb-4 text-sm text-gray-300">
                  I&apos;m open to internships, research, and full-time roles.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-900 transition-all hover:bg-gray-200"
                >
                  Get in Touch
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

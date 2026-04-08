import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Resume",
  description: `View and download ${siteConfig.name}'s resume.`,
};

const skills = [
  "Python", "SQL", "R", "TypeScript", "Excel", "MATLAB", "C++", "Tableau", "Apps Script"
];

export default function ResumePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-wide py-12 md:py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
                Resume
              </p>
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {siteConfig.name}
              </h1>
              <p className="mt-2 text-gray-600">
                Data Analytics & Applied Economics
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
              <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="mb-6 flex items-center gap-3 text-lg font-bold text-gray-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-600">
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
                        <h3 className="font-semibold text-gray-900">M.S. Economics</h3>
                        <span className="text-sm font-medium text-brand-600">Dec 2026</span>
                      </div>
                      <p className="text-gray-600">Texas A&M University, College Station</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-1 rounded-full bg-gray-300" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-semibold text-gray-900">B.S. Electrical Engineering</h3>
                        <span className="text-sm text-gray-500">May 2025</span>
                      </div>
                      <p className="text-gray-600">Texas A&M University, College Station</p>
                      <p className="text-sm text-gray-500">Minor in Economics</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="mb-6 flex items-center gap-3 text-lg font-bold text-gray-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </span>
                  Academic Projects
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "Investment Portfolio Performance Tracker",
                      role: "Developer",
                      date: "Aug 2025 - Present",
                      bullets: [
                        "Built an Excel–Python–Apps Script pipeline to compute daily returns, portfolio weights, and risk-adjusted metrics",
                        "Automated updates and dashboards to monitor performance, drawdowns, and margin usage"
                      ]
                    },
                    {
                      title: "Microhistological Sheep Project",
                      role: "Data Scientist",
                      date: "Aug 2024 - Aug 2025",
                      bullets: [
                        "Implemented a SQL server to store microhistological images and dietary data for a machine learning pipeline",
                        "Developed parsing and subimage-splicing scripts to improve speed and accuracy of ROI extraction"
                      ]
                    },
                    {
                      title: "QS World University Ranking Explorer",
                      role: "Data Analyst",
                      date: "Jun 2025 - Aug 2025",
                      bullets: [
                        "Created an interactive Python dashboard (ipywidgets, pandas) to explore QS 2026 rankings",
                        "Implemented sorting and tie-breaking logic using AR score and filters"
                      ]
                    }
                  ].map((project, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-1 rounded-full bg-purple-300" />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-semibold text-gray-900">{project.title}</h3>
                          <span className="text-sm text-gray-500">{project.date}</span>
                        </div>
                        <p className="text-sm text-purple-600 font-medium">{project.role}</p>
                        <ul className="mt-2 space-y-1">
                          {project.bullets.map((bullet, j) => (
                            <li key={j} className="text-sm text-gray-600 flex gap-2">
                              <span className="text-gray-400">•</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="mb-6 flex items-center gap-3 text-lg font-bold text-gray-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      title: "IT & Administrative Assistant",
                      company: "West Creek Dental, Austin, TX",
                      date: "Summer 2024",
                      bullets: [
                        "Provided general IT and hardware support across the clinic",
                        "Coordinated with insurance providers to streamline claims"
                      ]
                    },
                    {
                      title: "Engineering Intern",
                      company: "Silicon Labs, Austin, TX",
                      date: "Summer 2023",
                      bullets: [
                        "Built and tested circuits using soldering, breadboarding, and embedded programming",
                        "Designed an LED Pattern Generator using an Atmel microcontroller"
                      ]
                    },
                    {
                      title: "Math & Reading Instructor",
                      company: "Kumon Learning Center, Austin, TX",
                      date: "Summer 2022",
                      bullets: [
                        "Tutored students in math and reading, reinforcing foundational concepts",
                        "Created an Excel-based tracking system to monitor student progress"
                      ]
                    }
                  ].map((job, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-1 rounded-full bg-green-300" />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <span className="text-sm text-gray-500">{job.date}</span>
                        </div>
                        <p className="text-sm text-gray-600">{job.company}</p>
                        <ul className="mt-2 space-y-1">
                          {job.bullets.map((bullet, j) => (
                            <li key={j} className="text-sm text-gray-600 flex gap-2">
                              <span className="text-gray-400">•</span>
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
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Certifications
                </h3>
                <div>
                  <div className="font-semibold text-gray-900">Google Data Analytics</div>
                  <p className="text-sm text-gray-600">Professional Certificate</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Data cleaning, visualization, SQL, R, and Tableau
                  </p>
                </div>
              </div>

              {/* Leadership */}
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Leadership
                </h3>
                <div>
                  <div className="font-semibold text-gray-900">Academic Chair</div>
                  <p className="text-sm text-gray-600">Phi Delta Theta</p>
                  <p className="text-sm text-gray-500">Fall 2021 - Fall 2024</p>
                  <ul className="mt-2 space-y-1">
                    <li className="text-sm text-gray-600 flex gap-2">
                      <span className="text-gray-400">•</span>
                      Organized study sessions for ~70 members
                    </li>
                    <li className="text-sm text-gray-600 flex gap-2">
                      <span className="text-gray-400">•</span>
                      Improved chapter GPA by 0.75
                    </li>
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white">
                <h3 className="mb-2 font-semibold">Want to work together?</h3>
                <p className="mb-4 text-sm text-gray-300">
                  I&apos;m open to internships, research, and full-time roles.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-gray-900 transition-all hover:bg-gray-100"
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

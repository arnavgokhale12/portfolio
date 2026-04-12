"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Project {
  name: string;
  description: string;
  status: "active" | "planning" | "paused";
  link?: string;
}

const currentProjects: Project[] = [
  {
    name: "Portfolio Upgrades",
    description: "Adding dark/light mode, command palette, and AI concierge improvements",
    status: "active",
  },
  {
    name: "Social Media Automation",
    description: "Expanding Bluesky & X autoposters with AI-generated content scheduling",
    status: "active",
    link: "https://github.com/arnavgokhale12/bluesky-autoposter",
  },
  {
    name: "ML Research Pipeline",
    description: "Agricultural ML applications with Texas A&M AgriLife Research",
    status: "active",
  },
];

const statusConfig = {
  active: { bg: "bg-green-500", label: "Active" },
  planning: { bg: "bg-yellow-500", label: "Planning" },
  paused: { bg: "bg-gray-500", label: "Paused" },
};

export function CurrentlyWorkingOn() {
  return (
    <section className="bg-gray-100 py-16 dark:bg-gray-900">
      <div className="container-wide">
        <div className="mb-8 flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-brand-500" />
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Currently Working On
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {project.name}
                </h3>
                <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <span className={`h-2 w-2 rounded-full ${statusConfig[project.status].bg}`} />
                  {statusConfig[project.status].label}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
                >
                  View repo
                  <ArrowRight className="h-3 w-3" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

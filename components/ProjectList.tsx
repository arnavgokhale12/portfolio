"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilterTabs } from "./ProjectFilterTabs";
import { ProjectMeta } from "@/types";

interface ProjectListProps {
  projects: ProjectMeta[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <>
      <ProjectFilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {filteredProjects.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-700 p-12 text-center">
          <p className="text-gray-500">No projects found in this category.</p>
        </div>
      )}
    </>
  );
}

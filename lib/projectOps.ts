import { ProjectMeta } from "@/types";

export function getLiveProjects(projects: ProjectMeta[]) {
  return projects.filter((project) => Boolean(project.links?.demo));
}

export function getProjectOps(project: ProjectMeta) {
  return {
    hasCaseStudy: true,
    isLive: Boolean(project.links?.demo),
    stackCount: project.tags.length,
    hasPreview: Boolean(project.image),
  };
}

export function getProjectProof(project: ProjectMeta) {
  if (project.category === "ml") return "AI and ML systems";
  if (project.category === "data") return "Data to decision workflows";
  if (project.tags.some((tag) => /React Native|Expo|Mobile/i.test(tag))) {
    return "Mobile product execution";
  }
  if (project.links?.demo) return "Deployed product engineering";
  return "Backend engineering depth";
}

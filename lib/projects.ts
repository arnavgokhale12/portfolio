import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ProjectMeta, Project, ProjectCategory, isValidCategory } from "@/types";

const projectsDirectory = path.join(process.cwd(), "content/projects");

/**
 * Get all project slugs from MDX filenames
 */
export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Parse and validate frontmatter from MDX file
 */
function parseFrontmatter(
  data: Record<string, unknown>,
  slug: string
): Omit<Project, "content"> | null {
  // Required fields validation
  if (typeof data.title !== "string" || !data.title) {
    console.warn(`Project "${slug}" missing required field: title`);
    return null;
  }
  if (typeof data.description !== "string" || !data.description) {
    console.warn(`Project "${slug}" missing required field: description`);
    return null;
  }
  if (!isValidCategory(data.category)) {
    console.warn(
      `Project "${slug}" has invalid category: ${data.category}. Must be one of: ml, data, economics, engineering`
    );
    return null;
  }
  if (typeof data.date !== "string" || !data.date) {
    console.warn(`Project "${slug}" missing required field: date`);
    return null;
  }

  // Parse optional fields with defaults
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((t): t is string => typeof t === "string")
    : [];

  const links =
    typeof data.links === "object" && data.links !== null
      ? {
          github:
            typeof (data.links as Record<string, unknown>).github === "string"
              ? (data.links as Record<string, unknown>).github as string
              : undefined,
          demo:
            typeof (data.links as Record<string, unknown>).demo === "string"
              ? (data.links as Record<string, unknown>).demo as string
              : undefined,
          paper:
            typeof (data.links as Record<string, unknown>).paper === "string"
              ? (data.links as Record<string, unknown>).paper as string
              : undefined,
        }
      : undefined;

  return {
    slug,
    title: data.title,
    description: data.description,
    category: data.category as ProjectCategory,
    tags,
    date: data.date,
    featured: data.featured === true,
    image: typeof data.image === "string" ? data.image : undefined,
    links,
  };
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | null {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const meta = parseFrontmatter(data, slug);
  if (!meta) {
    return null;
  }

  return {
    ...meta,
    content,
  };
}

/**
 * Get all projects sorted by date (newest first)
 */
export function getAllProjects(): ProjectMeta[] {
  const slugs = getProjectSlugs();

  const projects = slugs
    .map((slug) => {
      const project = getProjectBySlug(slug);
      if (!project) return null;

      const { content, ...meta } = project;
      return meta;
    })
    .filter((p): p is ProjectMeta => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return projects;
}

/**
 * Get featured projects only
 */
export function getFeaturedProjects(): ProjectMeta[] {
  return getAllProjects().filter((p) => p.featured);
}

/**
 * Get projects filtered by category
 */
export function getProjectsByCategory(category: string): ProjectMeta[] {
  if (category === "all") return getAllProjects();
  return getAllProjects().filter((p) => p.category === category);
}

/**
 * Get unique categories from all projects
 */
export function getProjectCategories(): ProjectCategory[] {
  const projects = getAllProjects();
  const categories = new Set(projects.map((p) => p.category));
  return Array.from(categories);
}

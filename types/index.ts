export type ProjectCategory = "ml" | "data" | "economics" | "engineering";

export interface ProjectLinks {
  github?: string;
  demo?: string;
  paper?: string;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  date: string;
  featured?: boolean;
  image?: string;
  links?: ProjectLinks;
}

export interface Project extends ProjectMeta {
  content: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  label: string;
  icon: "github" | "linkedin" | "email";
}

// Type guard for validating category
export function isValidCategory(value: unknown): value is ProjectCategory {
  return (
    typeof value === "string" &&
    ["ml", "data", "economics", "engineering"].includes(value)
  );
}

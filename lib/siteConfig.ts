export const siteConfig = {
  // Personal info
  name: "Arnav Gokhale",
  title: "Full-stack developer building AI, data, and automation products",
  description:
    "I ship end-to-end systems: AI workspaces, data dashboards, mobile apps, and automation tools that run in production.",

  // Short bio for hero
  shortBio: "MS Economics @ Texas A&M • B.S. Electrical Engineering • Full-stack with an ML edge",

  // Tech stack highlights
  techStack: ["Next.js", "React", "TypeScript", "Python", "Tailwind CSS", "Vercel AI SDK"],

  // URLs
  siteUrl: "https://arnavgokhale.com",

  // Social links
  email: "arnavgokhale216@gmail.com",
  github: "https://github.com/arnavgokhale12",
  linkedin: "https://www.linkedin.com/in/arnavgokhale/",

  // Assets
  resumePath: "/resume.pdf",

  // Navigation links
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/course-tracker/index.html", label: "Grades" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

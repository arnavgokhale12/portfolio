export const siteConfig = {
  // Personal info
  name: "Arnav Gokhale",
  title: "Full-Stack Developer & ML Engineer",
  description:
    "Building AI-powered applications, data pipelines, and automation tools. From generative art to multi-agent systems—I ship end-to-end.",

  // Short bio for hero
  shortBio: "MS Economics @ Texas A&M • Full-stack with an ML edge",

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
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  // Personal info
  name: "Arnav Gokhale",
  title: "Data Analytics & Applied Economics",
  description:
    "I build production-grade data products—dashboards, analytics pipelines, and ML-backed applications—from messy data to decision-ready outputs.",

  // URLs
  siteUrl: "https://arnavgokhale.com",

  // Social links
  email: "arnavgokhale@gmail.com",
  github: "https://github.com/arnavgokhale12",
  linkedin: "https://www.linkedin.com/in/arnavgokhale/",

  // Assets
  resumePath: "/resume.pdf",

  // Navigation links (max 5)
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

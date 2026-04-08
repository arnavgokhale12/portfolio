import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { siteConfig } from "@/lib/siteConfig";

export interface ContentChunk {
  id: string;
  text: string;
  source: {
    title: string;
    url: string;
  };
}

/**
 * Strip MDX/Markdown to plain text
 */
function stripMdx(content: string): string {
  return (
    content
      // Remove frontmatter
      .replace(/^---[\s\S]*?---/m, "")
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, "")
      // Remove inline code
      .replace(/`[^`]+`/g, "")
      // Remove images
      .replace(/!\[.*?\]\(.*?\)/g, "")
      // Remove links but keep text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      // Remove HTML tags
      .replace(/<[^>]+>/g, "")
      // Remove headings markers
      .replace(/^#{1,6}\s+/gm, "")
      // Remove bold/italic
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/__([^_]+)__/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      // Remove horizontal rules
      .replace(/^[-*_]{3,}$/gm, "")
      // Remove list markers
      .replace(/^[\s]*[-*+]\s+/gm, "")
      .replace(/^[\s]*\d+\.\s+/gm, "")
      // Remove blockquotes
      .replace(/^>\s+/gm, "")
      // Remove table formatting
      .replace(/\|/g, " ")
      // Collapse multiple newlines
      .replace(/\n{3,}/g, "\n\n")
      // Collapse multiple spaces
      .replace(/[ \t]+/g, " ")
      .trim()
  );
}

/**
 * Split text into chunks of roughly targetSize characters
 */
function chunkText(text: string, targetSize = 500): string[] {
  const paragraphs = text.split(/\n\n+/);
  const chunks: string[] = [];
  let currentChunk = "";

  for (const para of paragraphs) {
    if (currentChunk.length + para.length > targetSize && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = para;
    } else {
      currentChunk += (currentChunk ? "\n\n" : "") + para;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

/**
 * Load all MDX project files and extract content
 */
function loadProjects(): ContentChunk[] {
  const projectsDir = path.join(process.cwd(), "content/projects");
  const chunks: ContentChunk[] = [];

  if (!fs.existsSync(projectsDir)) {
    return chunks;
  }

  const files = fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));

  for (const file of files) {
    const filePath = path.join(projectsDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const slug = file.replace(/\.mdx$/, "");
    const title = data.title || slug;
    const description = data.description || "";
    const category = data.category || "";
    const tags = Array.isArray(data.tags) ? data.tags.join(", ") : "";

    // Create a header chunk with metadata
    const metaText = `Project: ${title}\nDescription: ${description}\nCategory: ${category}\nTags: ${tags}`;
    chunks.push({
      id: `project-${slug}-meta`,
      text: metaText,
      source: { title, url: `/projects/${slug}` },
    });

    // Chunk the main content
    const plainText = stripMdx(content);
    const textChunks = chunkText(plainText, 600);

    textChunks.forEach((chunk, i) => {
      chunks.push({
        id: `project-${slug}-${i}`,
        text: chunk,
        source: { title, url: `/projects/${slug}` },
      });
    });
  }

  return chunks;
}

/**
 * About page content (extracted from the actual page)
 */
function loadAboutContent(): ContentChunk[] {
  const aboutText = `
About Arnav Gokhale

Arnav is an MS Economics student at Texas A&M University with a focus on applied econometrics and machine learning. His work spans building real-time analytics dashboards, developing ML pipelines for agricultural research, and shipping mobile apps with production-quality code.

What sets Arnav apart: He doesn't just analyze data—he ships products. Whether it's a FastAPI backend serving real-time supply-chain indicators, a React Native app with native iOS widgets, or an ML system processing microhistological imagery, he owns the full stack from data ingestion to deployment.

Currently collaborating with Texas A&M AgriLife Research on ML systems for livestock dietary analysis.

Technical Skills:
- Languages: Python, SQL, TypeScript, R
- Data & ML: Pandas, scikit-learn, XGBoost, statsmodels, NumPy
- Backend: FastAPI, SQLAlchemy, Alembic, PostgreSQL, Streamlit, Docker
- Frontend & Mobile: React Native, Expo, Next.js, Tailwind CSS
  `.trim();

  return chunkText(aboutText, 500).map((chunk, i) => ({
    id: `about-${i}`,
    text: chunk,
    source: { title: "About", url: "/about" },
  }));
}

/**
 * Resume content (extracted from the actual page)
 */
function loadResumeContent(): ContentChunk[] {
  const resumeText = `
Arnav Gokhale Resume

Education:
- MS Economics at Texas A&M University, expected December 2026
- BS Electrical Engineering at Texas A&M University, May 2025
- Minor in Economics

Academic Projects:
- Investment Portfolio Performance Tracker (Aug 2025 - Present): Built an Excel-Python-Apps Script pipeline to compute daily returns, portfolio weights, and risk-adjusted metrics. Automated updates and dashboards to monitor performance, drawdowns, and margin usage.
- Microhistological Sheep Project (Aug 2024 - Aug 2025): Implemented a SQL server to store microhistological images and dietary data for a machine learning pipeline. Developed parsing and subimage-splicing scripts for ROI extraction.
- QS World University Ranking Explorer (Jun 2025 - Aug 2025): Created an interactive Python dashboard with ipywidgets and pandas to explore QS 2026 rankings by region, discipline, and size.

Work Experience:
- IT & Administrative Assistant at West Creek Dental, Austin TX (Summer 2024): IT and hardware support, insurance claims coordination.
- Engineering Intern at Silicon Labs, Austin TX (Summer 2023): Built and tested circuits, designed an LED Pattern Generator using Atmel microcontroller.
- Math & Reading Instructor at Kumon Learning Center (Summer 2022): Tutored students, created Excel-based tracking system.

Certifications:
- Google Data Analytics Certificate (Aug 2025): Training in data cleaning, visualization, SQL, R, and Tableau.

Leadership:
- Academic Chair at Phi Delta Theta (Fall 2021 - Fall 2024): Organized study sessions for ~70 members, improved chapter GPA by 0.75.

Technical Skills: Python, SQL, R, Microsoft Excel, MATLAB, C++, Xilinx, Tableau, Apps Script

Arnav is open to internships, research collaborations, and full-time roles in data science, analytics, and applied economics.
  `.trim();

  return chunkText(resumeText, 500).map((chunk, i) => ({
    id: `resume-${i}`,
    text: chunk,
    source: { title: "Resume", url: "/resume" },
  }));
}

/**
 * Site config content
 */
function loadSiteConfigContent(): ContentChunk[] {
  const configText = `
Contact Information for Arnav Gokhale:
- Email: ${siteConfig.email}
- GitHub: ${siteConfig.github}
- LinkedIn: ${siteConfig.linkedin}

Arnav's positioning: ${siteConfig.title}
${siteConfig.description}
  `.trim();

  return [
    {
      id: "siteconfig-0",
      text: configText,
      source: { title: "Contact", url: "/contact" },
    },
  ];
}

/**
 * Load all portfolio content as chunks
 */
export function loadAllContent(): ContentChunk[] {
  return [
    ...loadProjects(),
    ...loadAboutContent(),
    ...loadResumeContent(),
    ...loadSiteConfigContent(),
  ];
}

/**
 * Get unique sources from chunks
 */
export function getSourcesFromChunks(
  chunks: ContentChunk[]
): { title: string; url: string }[] {
  const seen = new Set<string>();
  const sources: { title: string; url: string }[] = [];

  for (const chunk of chunks) {
    if (!seen.has(chunk.source.url)) {
      seen.add(chunk.source.url);
      sources.push(chunk.source);
    }
  }

  return sources;
}

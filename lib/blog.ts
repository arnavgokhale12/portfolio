import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content/blog");

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
}

export interface BlogPost extends BlogMeta {
  content: string;
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllBlogPosts(): BlogMeta[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const files = fs.readdirSync(blogDirectory).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(blogDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "",
      tags: data.tags || [],
      readingTime: calculateReadingTime(content),
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(blogDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    tags: data.tags || [],
    readingTime: calculateReadingTime(content),
    content,
  };
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

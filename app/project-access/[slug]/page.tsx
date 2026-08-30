import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectAccessGate } from "@/components/ProjectAccessGate";

const protectedProjects: Record<string, { title: string; destinationUrl: string }> = {
  "econ675-presentation-prep": {
    title: "ECON 675 Presentation Prep",
    destinationUrl: "https://econ675-presentation-prep.vercel.app",
  },
};

interface ProjectAccessPageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = {
  title: "Project Access",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProjectAccessPage({ params }: ProjectAccessPageProps) {
  const { slug } = await params;
  const project = protectedProjects[slug];

  if (!project) {
    notFound();
  }

  return (
    <ProjectAccessGate
      title={project.title}
      destinationUrl={project.destinationUrl}
    />
  );
}

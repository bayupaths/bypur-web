import Image from "next/image";
import { ExternalLink, Code2 } from "lucide-react";
import { Card, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-xl p-0 transition-all duration-200 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
      {/* Image placeholder */}
      <div className="relative aspect-video overflow-hidden bg-bg-subtle">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Code2 size={28} className="text-text-3 opacity-10" />
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </div>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1">
          {project.techStack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        {/* Links */}
        <CardFooter>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] text-text-2 transition-colors hover:text-accent"
            >
              <ExternalLink size={12} />
              Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[12px] text-text-2 transition-colors hover:text-accent"
            >
              <Code2 size={12} />
              Code
            </a>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
}

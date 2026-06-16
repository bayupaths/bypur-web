import { FadeUp } from "@/components/ui/motion";
import { Badge } from "@/components/ui/badge";
import type { Skill } from "@/lib/types";

interface SupportingStackProps {
  skills: Skill[];
}

export function SupportingStack({ skills }: SupportingStackProps) {
  if (skills.length === 0) return null;

  return (
    <div>
      <FadeUp delay={0.15}>
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10">
            <span className="font-mono text-sm font-bold text-secondary">02</span>
          </div>
          <div className="flex-1">
            <h3 className="text-[13px] font-bold uppercase tracking-[0.16em] text-text-1">
              Supporting Stack
            </h3>
            <p className="text-[11px] text-text-3">Regular toolkit & frequently used</p>
          </div>
          <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
        </div>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill, idx) => (
            <FadeUp key={skill.name} delay={0.15 + idx * 0.01}>
              <Badge
                variant="tech"
                className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/20"
              >
                <span className="relative z-10">{skill.name}</span>
                {/* Shine effect */}
                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </Badge>
            </FadeUp>
          ))}
        </div>
      </FadeUp>
    </div>
  );
}

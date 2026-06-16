import { FadeUp } from "@/components/ui/motion";
import { Badge } from "@/components/ui/badge";

interface FamiliarStackProps {
  items: string[];
}

export function FamiliarStack({ items }: FamiliarStackProps) {
  return (
    <div>
      <FadeUp delay={0.2}>
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10">
            <span className="font-mono text-sm font-bold text-secondary">03</span>
          </div>
          <div className="flex-1">
            <h3 className="text-[13px] font-bold uppercase tracking-[0.16em] text-text-1">
              Familiar With
            </h3>
            <p className="text-[11px] text-text-3">Working knowledge & side tools</p>
          </div>
          <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
        </div>

        <div className="flex flex-wrap gap-2.5">
          {items.map((name, idx) => (
            <FadeUp key={name} delay={0.2 + idx * 0.01}>
              <Badge
                variant="outline"
                className="transition-all duration-200 hover:scale-105 hover:border-accent/60 hover:bg-accent/5 hover:text-accent"
              >
                {name}
              </Badge>
            </FadeUp>
          ))}
        </div>
      </FadeUp>
    </div>
  );
}

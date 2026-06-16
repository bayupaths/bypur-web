import { FadeUp } from "@/components/ui/motion";
import { Card } from "@/components/ui/card";
import { getIconComponent } from "./utils";
import type { PrimaryStackItem } from "@/lib/types";

interface PrimaryStackProps {
  items: PrimaryStackItem[];
}

export function PrimaryStack({ items }: PrimaryStackProps) {
  return (
    <div>
      <FadeUp delay={0.05}>
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10">
            <span className="font-mono text-sm font-bold text-secondary">01</span>
          </div>
          <div className="flex-1">
            <h3 className="text-[13px] font-bold uppercase tracking-[0.16em] text-text-1">
              Primary Stack
            </h3>
            <p className="text-[11px] text-text-3">Daily drivers & core expertise</p>
          </div>
          <div className="h-px flex-1 bg-linear-to-r from-border to-transparent" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((item, idx) => {
            const Icon = getIconComponent(item.icon);
            return (
              <FadeUp key={item.name} delay={0.05 + idx * 0.02}>
                <Card
                  variant="interactive"
                  className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-accent/10"
                >
                  {/* Gradient decoration */}
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/5 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-bg transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-accent/20">
                      <Icon className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-[16px] font-bold text-text-1 transition-colors group-hover:text-accent">
                        {item.name}
                      </h4>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-text-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </FadeUp>
            );
          })}
        </div>
      </FadeUp>
    </div>
  );
}

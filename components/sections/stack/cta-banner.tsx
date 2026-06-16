import { ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import type { SkillsConfig } from "@/lib/types";

interface CTABannerProps {
  cta?: SkillsConfig["cta"];
}

export function CTABanner({ cta }: CTABannerProps) {
  const label = cta?.label || "Portfolio Showcase";
  const title = cta?.title || "See these skills in action";
  const description =
    cta?.description ||
    "Browse real-world projects where I've applied these technologies";
  const buttonText = cta?.button?.text || "View Projects";
  const buttonHref = cta?.button?.href || "#projects";

  return (
    <FadeUp delay={0.25}>
      <div className="group relative overflow-hidden rounded-xl border border-accent/20 bg-linear-to-br from-accent/10 via-accent/5 to-transparent p-8 shadow-xl shadow-accent/5 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 sm:p-10">
        {/* Animated gradient blobs */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/15 blur-3xl transition-all duration-500 group-hover:scale-125" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-accent/10 blur-3xl transition-all duration-700 group-hover:scale-110" />

        <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-secondary">
                {label}
              </span>
            </div>
            <h3 className="mt-3 text-xl font-bold text-text-1 sm:text-2xl">{title}</h3>
            <p className="mt-2 text-[14px] text-text-2">{description}</p>
          </div>

          <Button
            href={buttonHref}
            variant="primary"
            icon={ArrowRight}
            iconPosition="right"
            className="shrink-0 shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/30"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </FadeUp>
  );
}

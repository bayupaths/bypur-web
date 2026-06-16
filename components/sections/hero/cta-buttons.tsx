import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types";

interface CTAButtonsProps {
  cta?: Profile["cta"];
}

export function CTAButtons({ cta }: CTAButtonsProps) {
  if (!cta?.primary && !cta?.secondary) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
      {cta.primary && (
        <Button
          href={cta.primary.href}
          variant="primary"
          icon={ArrowRight}
          iconPosition="right"
        >
          {cta.primary.text}
        </Button>
      )}
      {cta.secondary && (
        <Button href={cta.secondary.href} variant="secondary">
          {cta.secondary.text}
        </Button>
      )}
    </div>
  );
}

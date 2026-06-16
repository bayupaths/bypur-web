import { FadeUp } from "@/components/ui/motion";
import type { Service } from "@/lib/types";

interface ServicesListProps {
  services: Service[];
}

export function ServicesList({ services }: ServicesListProps) {
  return (
    <FadeUp delay={0.1}>
      <div className="lg:pt-1">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-3">
          What I do
        </p>
        <ul className="flex flex-col">
          {services.map((service, index) => (
            <li
              key={service.slug}
              className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-t border-border py-5 last:border-b"
            >
              <span className="font-mono text-[11px] tabular-nums text-text-3 transition-colors duration-150 group-hover:text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-text-1">
                  {service.title}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-text-2">
                  {service.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </FadeUp>
  );
}

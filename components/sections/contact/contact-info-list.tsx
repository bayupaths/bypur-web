import { useState } from "react";
import { Copy, Check, ArrowRight } from "lucide-react";
import { FadeUp } from "@/components/ui/motion";
import { getIconComponent } from "./utils";
import type { ContactInfo } from "@/lib/types";

interface ContactInfoListProps {
  contactInfo: ContactInfo[];
  email: string;
}

export function ContactInfoList({ contactInfo, email }: ContactInfoListProps) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silent fail
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <FadeUp delay={0.05}>
        <ul className="flex flex-col gap-3">
          {contactInfo.map((c) => {
            const Icon = getIconComponent(c.icon);
            return (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-bg-card p-4 transition-all duration-200 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-bg-subtle">
                    <Icon size={15} className="text-text-2" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-text-3">
                      {c.label}
                    </span>
                    <span className="truncate text-[13px] font-medium text-text-1">{c.value}</span>
                  </div>
                  {c.copyable ? (
                    <button
                      type="button"
                      aria-label={copied ? "Copied" : "Copy email"}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-bg-subtle text-text-3 transition-colors duration-200 hover:border-accent/40 hover:text-accent"
                      onClick={(e) => {
                        e.preventDefault();
                        copyEmail();
                      }}
                    >
                      {copied ? (
                        <Check size={13} className="text-emerald-500" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  ) : c.href !== "#" ? (
                    <ArrowRight
                      size={13}
                      className="shrink-0 text-text-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
      </FadeUp>
    </div>
  );
}

import { useState } from "react";
import { Send } from "lucide-react";
import { FadeUp } from "@/components/ui/motion";
import type { ContactConfig } from "@/lib/types";

interface ContactFormProps {
  email: string;
  formConfig?: ContactConfig["form"];
}

export function ContactForm({ email, formConfig }: ContactFormProps) {
  const [selectedType, setSelectedType] = useState<string>("Web app");
  const [message, setMessage] = useState("");
  const MAX_MSG = 1000;

  const title = formConfig?.title || "Send me a message";
  const subtitle = formConfig?.subtitle || "I'll get back to you within 1–2 working days.";
  const projectTypes = formConfig?.projectTypes || [
    "Web app",
    "Landing page",
    "API / Backend",
    "Consulting",
    "Other",
  ];

  return (
    <FadeUp delay={0.1}>
      <form
        action={`mailto:${email}`}
        method="post"
        encType="text/plain"
        className="flex flex-col gap-4 rounded-xl border border-border bg-bg-card p-6 shadow-sm sm:p-7"
      >
        <div>
          <h3 className="text-[15px] font-semibold text-text-1">{title}</h3>
          <p className="mt-1 text-[12px] text-text-2">{subtitle}</p>
        </div>

        <div className="h-px w-full bg-border" />

        {/* Project type */}
        <fieldset className="flex flex-col gap-2">
          <legend className="text-[10px] font-semibold uppercase tracking-wider text-text-3">
            What&apos;s this about?
          </legend>
          <div className="flex flex-wrap gap-1.5">
            {projectTypes.map((type) => (
              <label key={type} className="cursor-pointer">
                <input
                  type="radio"
                  name="project_type"
                  value={type}
                  checked={selectedType === type}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="peer sr-only"
                />
                <span className="inline-flex items-center rounded-full border border-border bg-bg-subtle px-3 py-1 text-[11px] font-medium text-text-2 transition-colors duration-150 hover:border-accent/30 hover:text-text-1 peer-checked:border-accent/50 peer-checked:bg-accent/8 peer-checked:text-accent">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Name + Email */}
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-3">
              Name
            </span>
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className="rounded-md border border-border bg-bg-subtle px-3 py-2.5 text-[13px] text-text-1 outline-none transition placeholder:text-text-3 focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-3">
              Email
            </span>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="rounded-md border border-border bg-bg-subtle px-3 py-2.5 text-[13px] text-text-1 outline-none transition placeholder:text-text-3 focus:border-accent focus:ring-2 focus:ring-accent/15"
            />
          </label>
        </div>

        {/* Message */}
        <label className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-text-3">
              Message
            </span>
            <span
              className={`font-mono text-[10px] tabular-nums ${
                message.length > MAX_MSG * 0.9 ? "text-accent" : "text-text-3"
              }`}
            >
              {message.length}/{MAX_MSG}
            </span>
          </div>
          <textarea
            name="message"
            required
            rows={5}
            maxLength={MAX_MSG}
            placeholder="Tell me about your project..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="resize-none rounded-md border border-border bg-bg-subtle px-3 py-2.5 text-[13px] text-text-1 outline-none transition placeholder:text-text-3 focus:border-accent focus:ring-2 focus:ring-accent/15"
          />
        </label>

        {/* Submit */}
        <button
          type="submit"
          className="group flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-[13px] font-semibold text-accent-fg shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30"
        >
          <Send size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          Send Message
        </button>
      </form>
    </FadeUp>
  );
}

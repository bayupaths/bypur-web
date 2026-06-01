<script setup lang="ts">
import {
  Mail, Phone, MapPin, Send, ArrowRight, Copy, Check,
} from '@lucide/vue'
import { profile } from '~/data/profile'
const { socials } = useSocials()

const copied = ref(false)
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch { /* silent */ }
}

const projectTypes = [
  'Web app', 'Landing page', 'API / Backend', 'Consulting', 'Other',
] as const
const selectedType = ref<string>('Web app')

const message    = ref('')
const MAX_MSG    = 1000
const messageLen = computed(() => message.value.length)

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    copyable: true,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: profile.phone ?? '—',
    href: profile.phone ? `tel:${profile.phone.replace(/\s|-/g, '')}` : '#',
    copyable: false,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Indonesia · UTC+7 · Replies in ~24h',
    href: '#',
    copyable: false,
  },
]
</script>

<template>
  <section
    id="contact"
    class="relative isolate py-20 sm:py-24 lg:py-32"
  >
    <div class="container-main">

      <UiSectionTitle
        kicker="Contact"
        title="Let's build"
        accent="something together."
        description="Open to freelance projects, full-time opportunities, or just a friendly chat about code."
      />

      <div class="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[1fr_1.15fr] lg:gap-8">

        <!-- LEFT -->
        <div class="flex flex-col gap-4">

          <!-- Contact info cards -->
          <ul class="flex flex-col gap-3">
            <li v-for="c in contactInfo" :key="c.label">
              <a
                :href="c.href"
                class="group flex items-center gap-3 rounded-2xl border border-(--border) bg-(--bg-card) p-4 transition-colors duration-200 hover:border-(--accent)/40"
              >
                <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-(--border) bg-(--bg-subtle)">
                  <component :is="c.icon" :size="15" class="text-(--text-2)" />
                </span>
                <div class="flex min-w-0 flex-1 flex-col">
                  <span class="text-[10px] font-semibold uppercase tracking-wider text-(--text-3)">
                    {{ c.label }}
                  </span>
                  <span class="truncate text-[13px] font-medium text-(--text-1)">
                    {{ c.value }}
                  </span>
                </div>
                <button
                  v-if="c.copyable"
                  type="button"
                  :aria-label="copied ? 'Copied' : 'Copy email'"
                  class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-(--border) bg-(--bg-subtle) text-(--text-3) transition-colors duration-200 hover:border-(--accent)/40 hover:text-(--accent)"
                  @click.prevent="copyEmail"
                >
                  <Check v-if="copied" :size="13" class="text-green-500" />
                  <Copy  v-else        :size="13" />
                </button>
                <ArrowRight
                  v-else-if="c.href !== '#'"
                  :size="13"
                  class="shrink-0 text-(--text-3) transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-(--accent)"
                />
              </a>
            </li>
          </ul>

          <!-- Socials -->
          <div class="rounded-2xl border border-(--border) bg-(--bg-subtle) p-4">
            <p class="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-(--text-3)">
              Find me online
            </p>
            <ul class="flex flex-wrap gap-2">
              <li v-for="s in socials" :key="s.label">
                <a
                  :href="s.href"
                  :aria-label="s.label"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex h-9 w-9 items-center justify-center rounded-lg border border-(--border) bg-(--bg-card) text-(--text-2) transition-colors duration-200 hover:border-(--accent)/40 hover:text-(--accent)"
                >
                  <svg
                    v-if="s.svgPath"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-4 w-4"
                  >
                    <path :d="s.svgPath" />
                  </svg>
                  <component v-else :is="s.icon" :size="15" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <!-- RIGHT: form -->
        <form
          :action="`mailto:${profile.email}`"
          method="post"
          enctype="text/plain"
          class="flex flex-col gap-4 rounded-2xl border border-(--border) bg-(--bg-card) p-6 sm:p-7"
        >
          <div>
            <h3 class="text-[15px] font-semibold text-(--text-1)">Send me a message</h3>
            <p class="mt-1 text-[12px] text-(--text-2)">I'll get back to you within 1–2 working days.</p>
          </div>

          <div class="h-px w-full bg-(--border)" />

          <!-- Project type -->
          <fieldset class="flex flex-col gap-2">
            <legend class="text-[10px] font-semibold uppercase tracking-wider text-(--text-3)">
              What's this about?
            </legend>
            <div class="flex flex-wrap gap-1.5">
              <label v-for="t in projectTypes" :key="t" class="cursor-pointer">
                <input
                  v-model="selectedType"
                  type="radio"
                  name="project_type"
                  :value="t"
                  class="peer sr-only"
                >
                <span
                  class="inline-flex items-center rounded-full border border-(--border) bg-(--bg-subtle) px-3 py-1 text-[11px] font-medium text-(--text-2) transition-colors duration-150 hover:border-(--accent)/30 hover:text-(--text-1) peer-checked:border-(--accent)/50 peer-checked:bg-(--accent)/8 peer-checked:text-(--accent)"
                >
                  {{ t }}
                </span>
              </label>
            </div>
          </fieldset>

          <!-- Name + Email -->
          <div class="grid gap-3 sm:grid-cols-2">
            <label class="flex flex-col gap-1.5">
              <span class="text-[10px] font-semibold uppercase tracking-wider text-(--text-3)">Name</span>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                class="rounded-xl border border-(--border) bg-(--bg-subtle) px-3 py-2.5 text-[13px] text-(--text-1) placeholder:text-(--text-3) outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/15"
              >
            </label>
            <label class="flex flex-col gap-1.5">
              <span class="text-[10px] font-semibold uppercase tracking-wider text-(--text-3)">Email</span>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                class="rounded-xl border border-(--border) bg-(--bg-subtle) px-3 py-2.5 text-[13px] text-(--text-1) placeholder:text-(--text-3) outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/15"
              >
            </label>
          </div>

          <!-- Message -->
          <label class="flex flex-col gap-1.5">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-semibold uppercase tracking-wider text-(--text-3)">Message</span>
              <span
                class="font-mono text-[10px] tabular-nums"
                :class="messageLen > MAX_MSG * 0.9 ? 'text-(--accent)' : 'text-(--text-3)'"
              >
                {{ messageLen }} / {{ MAX_MSG }}
              </span>
            </div>
            <textarea
              v-model="message"
              name="message"
              required
              rows="5"
              :maxlength="MAX_MSG"
              placeholder="Tell me a little about your project or idea…"
              class="resize-none rounded-xl border border-(--border) bg-(--bg-subtle) px-3 py-2.5 text-[13px] text-(--text-1) placeholder:text-(--text-3) outline-none transition focus:border-(--accent) focus:ring-2 focus:ring-(--accent)/15"
            />
          </label>

          <div class="h-px w-full bg-(--border)" />

          <!-- Submit -->
          <div class="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-[11px] text-(--text-3)">
              Prefer email?
              <a
                :href="`mailto:${profile.email}`"
                class="font-medium text-(--text-2) underline-offset-2 hover:underline"
              >
                {{ profile.email }}
              </a>
            </p>
            <button type="submit" class="btn-primary group justify-center">
              Send message
              <Send :size="14" class="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </form>

      </div>
    </div>
  </section>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  .animate-ping { animation: none !important; }
}
</style>
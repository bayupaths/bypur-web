<script setup lang="ts">
import { ArrowUpRight, Mail, Phone } from '@lucide/vue'
import { profile } from '~/data/profile'

const navLinks = useNavLinks()
const { socials } = useSocials()

const contactLinks = computed(() => [
  profile.email && {
    label: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  profile.phone && {
    label: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, '')}`,
    icon: Phone,
  },
].filter(Boolean) as Array<{ label: string, href: string, icon: typeof Mail }>)

const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative isolate overflow-hidden border-t border-(--border)/60">
    <!-- Ambient glow -->
    <div class="pointer-events-none absolute -top-40 left-1/2 -z-10 h-80 w-240 -translate-x-1/2 rounded-full bg-(--accent)/8 blur-3xl" />

    <div class="container-main py-16 sm:py-20">
      <!-- Big interactive CTA -->
      <NuxtLink to="#contact" class="group mb-14 block sm:mb-20">
        <span class="mb-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-(--accent)">
          <UiPulseDot />
          Got an idea?
        </span>

        <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-4xl font-black leading-[1.05] tracking-tight text-(--text-1) sm:text-5xl lg:text-6xl">
          <span>Let's build</span>
          <span class="inline-flex items-baseline gap-3 text-(--accent)">
            something
            <ArrowUpRight
              class="size-9 shrink-0 -translate-y-1 transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 sm:size-12 lg:size-14"
            />
          </span>
        </div>

        <p class="mt-4 max-w-xl text-sm text-(--text-3) sm:text-base">
          A quick message is all it takes to start.
          <span class="text-(--text-2) underline decoration-(--border) underline-offset-4 transition-colors group-hover:decoration-(--accent)">
            Send the first one
          </span>
          and let's see where it goes.
        </p>
      </NuxtLink>

      <!-- Middle grid -->
      <div class="grid gap-10 border-t border-(--border) pt-12 md:grid-cols-[1.6fr_1fr_1fr] md:gap-12">
        <!-- Brand -->
        <div class="flex flex-col gap-5">
          <NuxtLink to="/" aria-label="Home" class="inline-flex w-fit">
            <UiAppLogo :height="24" />
          </NuxtLink>

          <p class="max-w-sm text-sm leading-relaxed text-(--text-3)">
            {{ profile.bio }}
          </p>

          <!-- Socials -->
          <ul class="flex flex-wrap items-center gap-1.5">
            <li v-for="social in socials" :key="social.label">
              <a
                :href="social.href"
                :aria-label="social.label"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center rounded-full border border-(--border) bg-(--bg)/60 text-(--text-3) transition-all hover:-translate-y-0.5 hover:border-(--accent)/40 hover:bg-(--accent)/10 hover:text-(--accent)"
              >
                <UiSocialIcon :icon="social.icon" :svg-path="social.svgPath" />
              </a>
            </li>
          </ul>
        </div>

        <!-- Sitemap -->
        <nav class="flex flex-col gap-4" aria-label="Footer navigation">
          <h2 class="text-[10px] font-semibold uppercase tracking-[0.2em] text-(--text-3)">
            Sitemap
          </h2>

          <ul class="flex flex-col gap-2.5">
            <li v-for="link in navLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="group inline-flex items-center gap-2 text-sm text-(--text-2) transition-colors hover:text-(--accent)"
              >
                <span class="size-1 rounded-full bg-(--border) transition-colors duration-300 group-hover:bg-(--accent)" />
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Get in touch -->
        <div class="flex flex-col gap-4">
          <h2 class="text-[10px] font-semibold uppercase tracking-[0.2em] text-(--text-3)">
            Get in touch
          </h2>

          <ul class="flex flex-col gap-2.5 text-sm">
            <li v-for="link in contactLinks" :key="link.href">
              <a
                :href="link.href"
                class="group inline-flex items-center gap-2 text-(--text-2) transition-colors hover:text-(--accent)"
              >
                <component
                  :is="link.icon"
                  :size="14"
                  class="text-(--text-3) transition-colors group-hover:text-(--accent)"
                />
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-12 flex flex-col items-start justify-between gap-3 border-t border-(--border) pt-6 text-xs text-(--text-3) sm:flex-row sm:items-center">
        <p>© {{ year }} {{ profile.name }}. All rights reserved.</p>
        <p>
          Designed & coded in
          <span class="text-(--text-2)">{{ profile.location }}</span>
        </p>
      </div>
    </div>
  </footer>
</template>

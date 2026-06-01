<script setup lang="ts">
import { ArrowRight, Download } from '@lucide/vue'

const [{ data: profile }, { data: services }] = await Promise.all([
  useProfile(),
  useServices(),
])
</script>

<template>
  <section id="about" class="relative py-20 sm:py-24 lg:py-32">
    <div class="container-main">

      <UiSectionTitle
        kicker="About"
        title="A developer who cares about"
        accent="the full picture."
      />

      <div class="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">

        <!-- LEFT — Narrative -->
        <div class="flex flex-col">

          <p class="text-lg leading-[1.75] text-(--text-1) sm:text-xl sm:leading-[1.7]">
            Half a decade shipping <strong class="font-semibold">backend systems</strong> and
            <strong class="font-semibold">interfaces</strong> people actually want to use.
          </p>

          <p class="mt-5 text-[15px] leading-[1.8] text-(--text-2)">
            My favorite part is the seam where they meet — clean architecture, typed APIs,
            and thoughtful UI turning into a product that just feels right.
          </p>

          <!-- Stats row — simple & quiet -->
          <dl class="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-(--border) pt-6">
            <div class="flex items-baseline gap-2">
              <dt class="font-mono text-2xl font-bold tabular-nums text-(--text-1)">5+</dt>
              <dd class="text-[13px] text-(--text-3)">years</dd>
            </div>
            <div
              v-for="s in profile?.stats"
              :key="s.label"
              class="flex items-baseline gap-2"
            >
              <dt class="font-mono text-2xl font-bold tabular-nums text-(--text-1)">{{ s.value }}</dt>
              <dd class="text-[13px] text-(--text-3)">{{ s.label.toLowerCase() }}</dd>
            </div>
          </dl>

          <!-- CTAs -->
          <div class="mt-8 flex flex-wrap gap-3">
            <a href="#contact" class="btn-primary group text-sm">
              Get in touch
              <ArrowRight :size="13" class="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              v-if="profile?.resumeUrl"
              :href="profile.resumeUrl"
              download
              class="btn-secondary group text-sm"
            >
              <Download :size="13" class="transition-transform duration-200 group-hover:translate-y-0.5" />
              Download CV
            </a>
          </div>
        </div>

        <!-- RIGHT — What I do (numbered list, no icons) -->
        <div class="lg:pt-1">
          <p class="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--text-3)">
            What I do
          </p>
          <ul class="flex flex-col">
            <li
              v-for="(s, i) in services"
              :key="s.title"
              class="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-t border-(--border) py-5 last:border-b"
            >
              <span class="font-mono text-[11px] tabular-nums text-(--text-3) transition-colors duration-150 group-hover:text-(--accent)">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <div class="min-w-0">
                <p class="text-[15px] font-semibold text-(--text-1)">{{ s.title }}</p>
                <p class="mt-1 text-[13px] leading-relaxed text-(--text-2)">{{ s.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

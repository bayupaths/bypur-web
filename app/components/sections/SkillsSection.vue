<script setup lang="ts">
import {
  Layers, Server, Wrench, Brain, Bot,
  ArrowRight, Sparkles, type LucideIcon,
} from '@lucide/vue'
import type { Skill } from '~/types'

const { data: skills } = await useSkills()

type Category = Skill['category']

interface CategoryTile {
  key:     Category
  title:   string
  icon:    LucideIcon
  desc:    string
  primary: string
  span:    string
}

const row1: CategoryTile[] = [
  { key: 'frontend', title: 'Frontend',  icon: Layers, desc: 'UI craft & client-side architecture', primary: 'Nuxt 4',      span: 'lg:col-span-7' },
  { key: 'backend',  title: 'Backend',   icon: Server, desc: 'APIs, databases & business logic',    primary: 'Laravel 11',  span: 'lg:col-span-5' },
]

const row2: CategoryTile[] = [
  { key: 'tools',    title: 'Tooling',   icon: Wrench, desc: 'Day-to-day workflow',          primary: 'Docker',         span: 'lg:col-span-5' },
  { key: 'other',    title: 'Practices', icon: Brain,  desc: 'How I think about software',   primary: 'Clean arch',     span: 'lg:col-span-4' },
  { key: 'ai',       title: 'AI toolbelt', icon: Bot,  desc: 'Pair-programming with agents', primary: 'Claude',         span: 'lg:col-span-3' },
]

const allSkills = computed(() => skills.value ?? [])

function itemsFor(key: Category) {
  return allSkills.value.filter(s => s.category === key)
}

function chipsFor(key: Category, primary: string) {
  const items = itemsFor(key)
  const head  = items.find(s => s.name === primary)
  const tail  = items.filter(s => s.name !== primary)
  return head ? [head, ...tail] : items
}

const { el: sectionEl, visible } = useScrollReveal(0.06)
</script>

<template>
  <section
    id="skills"
    ref="sectionEl"
    class="relative isolate py-20 sm:py-24 lg:py-32 transition-[opacity,transform] duration-700 ease-out"
    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
  >
    <div class="container-main">

      <UiSectionTitle
        kicker="Skills"
        title="Tools I use to"
        accent="build great things."
      >
        <template #description>
          A snapshot of technologies and practices I rely on day-to-day
          <span v-if="allSkills.length" class="font-semibold text-(--text-1)">
            — {{ allSkills.length }}+ technologies.
          </span>
        </template>
      </UiSectionTitle>

      <div class="mx-auto grid max-w-6xl gap-2.5 sm:grid-cols-2 lg:grid-cols-12">

        <!-- Row 1: Frontend 7 + Backend 5 -->
        <article
          v-for="t in row1"
          :key="t.key"
          class="group relative rounded-2xl border border-(--border) bg-(--bg-card) p-5 sm:col-span-1 lg:p-6"
          :class="t.span"
        >
          <SectionsSkillCard :tile="t" :chips="chipsFor(t.key, t.primary)" />
        </article>

        <!-- Row 2: Tooling 5 + Practices 4 + AI 3 -->
        <article
          v-for="t in row2"
          :key="t.key"
          class="group relative rounded-2xl border border-(--border) p-5 sm:col-span-1 lg:p-6"
          :class="[
            t.span,
            t.key === 'ai'
              ? 'bg-(--bg-subtle)'
              : 'bg-(--bg-card)',
          ]"
        >
          <SectionsSkillCard :tile="t" :chips="chipsFor(t.key, t.primary)" />
        </article>

        <!-- CTA -->
        <a
          href="#projects"
          class="group relative isolate flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-(--border) bg-(--bg-card) px-5 py-4 transition-all duration-300 hover:border-(--accent)/50 hover:shadow-lg hover:shadow-(--accent)/5 sm:col-span-2 sm:px-6 lg:col-span-12"
        >
          <!-- Accent gradient wash on hover -->
          <span
            aria-hidden="true"
            class="absolute inset-0 -z-10 bg-linear-to-r from-(--accent)/0 via-(--accent)/5 to-(--accent)/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div class="flex items-center gap-3 sm:gap-4">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--border) bg-(--bg-subtle) text-(--accent) transition-transform duration-300 group-hover:scale-105 group-hover:border-(--accent)/40 sm:h-11 sm:w-11">
              <Sparkles :size="16" aria-hidden="true" />
            </span>
            <div class="min-w-0">
              <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-(--accent)">
                See these skills in action
              </p>
              <p class="mt-1 text-sm font-semibold text-(--text-1) sm:text-base">
                Browse projects I've shipped with them
                <span class="ml-0.5 text-(--text-3) transition-colors duration-300 group-hover:text-(--accent)">→</span>
              </p>
            </div>
          </div>
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-(--border) bg-(--bg-subtle) text-(--text-2) transition-all duration-300 group-hover:border-(--accent)/50 group-hover:bg-(--accent) group-hover:text-white group-hover:translate-x-1 sm:h-11 sm:w-11">
            <ArrowRight :size="16" aria-hidden="true" />
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
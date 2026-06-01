<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'
import { experiences as staticExperiences } from '~/data/experiences'
import type { Experience } from '~/types'

const { data } = await useFetch<Experience[]>('/api/experiences')
const experiences = computed(() => data.value ?? staticExperiences)

const yearsExp = computed(() => {
  const list = experiences.value
  if (!list.length) return 0
  const years = list.map((e) => {
    const match = e.period.match(/\d{4}/)
    return match ? parseInt(match[0], 10) : new Date().getFullYear()
  })
  return new Date().getFullYear() - Math.min(...years)
})

// ── Desktop: interactive detail panel ─────────────────────────────────────
const selectedId = ref(experiences.value[0]?.id ?? 1)
const selected   = computed<Experience>(() =>
  experiences.value.find(e => e.id === selectedId.value) ?? experiences.value[0]!,
)
const slideDir = ref<'down' | 'up'>('down')
watch(selectedId, (n, o) => {
  const ni = experiences.value.findIndex(e => e.id === n)
  const oi = experiences.value.findIndex(e => e.id === o)
  slideDir.value = ni > oi ? 'down' : 'up'
})

// ── Mobile: accordion ──────────────────────────────────────────────────────
const expandedId = ref<number | null>(experiences.value[0]?.id ?? null)
const toggleMobile = (id: number) => {
  expandedId.value = expandedId.value === id ? null : id
}

function onAccordionEnter(el: Element, done: () => void) {
  const h = el as HTMLElement
  h.style.height = '0'
  h.style.overflow = 'hidden'
  h.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  requestAnimationFrame(() => {
    h.style.height = h.scrollHeight + 'px'
    h.addEventListener('transitionend', done, { once: true })
  })
}
function onAccordionAfterEnter(el: Element) {
  const h = el as HTMLElement
  h.style.height = 'auto'
  h.style.overflow = ''
  h.style.transition = ''
}
function onAccordionLeave(el: Element, done: () => void) {
  const h = el as HTMLElement
  h.style.height = h.scrollHeight + 'px'
  h.style.overflow = 'hidden'
  h.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  requestAnimationFrame(() => {
    h.style.height = '0'
    h.addEventListener('transitionend', done, { once: true })
  })
}

const { el: sectionEl, visible } = useScrollReveal(0.08)
</script>

<template>
  <section
    id="experience"
    ref="sectionEl"
    class="relative isolate py-20 sm:py-24 lg:py-32 transition-[opacity,transform] duration-700 ease-out"
    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
  >
    <div class="container-main">

      <UiSectionTitle
        kicker="Experience"
        title="A timeline of"
        accent="building & learning."
        description="The roles, teams, and challenges that shaped how I work today."
      />

      <!-- Stats bar -->
      <div class="mx-auto mb-10 flex w-fit max-w-full overflow-hidden rounded-xl border border-(--border)">
        <div
          v-for="(s, i) in ([
            { value: `${yearsExp}+`, label: 'Years hands-on', accent: false },
            { value: experiences.length, label: 'Positions held', accent: false },
            { value: '↓40%', label: 'API latency cut', accent: true },
          ] as const)"
          :key="s.label"
          class="px-4 py-3 text-center sm:px-7 sm:py-4"
          :class="i < 2 ? 'border-r border-(--border)' : ''"
        >
          <p
            class="text-[1.375rem] font-semibold leading-none tabular-nums tracking-tight"
            :class="s.accent ? 'text-(--accent)' : 'text-(--text-1)'"
          >
            {{ s.value }}
          </p>
          <p class="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-(--text-3)">
            {{ s.label }}
          </p>
        </div>
      </div>

      <!-- ── Desktop: split panel ──────────────────────────────────────── -->
      <div class="mx-auto hidden max-w-5xl items-start gap-6 lg:grid lg:grid-cols-[240px_1fr] xl:max-w-6xl xl:grid-cols-[280px_1fr] xl:gap-8">

        <!-- Nav -->
        <nav class="relative flex flex-col gap-1.5" aria-label="Career timeline">
          <span class="pointer-events-none absolute left-4.5 top-5 bottom-5 w-px bg-(--border)" />

          <button
            v-for="(exp, i) in experiences"
            :key="exp.id"
            class="group relative rounded-xl border py-3 pr-3 pl-11 text-left transition-all duration-200"
            :class="selectedId === exp.id
              ? 'border-(--border) bg-(--bg-card)'
              : 'border-transparent hover:border-(--border) hover:bg-(--bg-card)'"
            @click="selectedId = exp.id"
          >
            <!-- Dot -->
            <span
              class="absolute left-2 top-1/2 -translate-y-1/2 flex h-5.5 w-5.5 items-center justify-center rounded-full border font-mono text-[9px] transition-all duration-200"
              :class="selectedId === exp.id
                ? 'border-(--text-1) bg-(--text-1) text-(--bg-card)'
                : 'border-(--border) bg-(--bg-card) text-(--text-3)'"
            >
              {{ String(i + 1).padStart(2, '0') }}
            </span>

            <span
              class="block text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors"
              :class="selectedId === exp.id ? 'text-(--text-3)' : 'text-(--text-3)'"
            >
              {{ exp.period }}
            </span>
            <span
              class="mt-0.5 block text-[13px] font-medium leading-snug transition-colors"
              :class="selectedId === exp.id ? 'text-(--text-1)' : 'text-(--text-2) group-hover:text-(--text-1)'"
            >
              {{ exp.role }}
            </span>
            <span class="mt-0.5 block text-[11px] text-(--text-3)">
              {{ exp.company }}
            </span>
          </button>
        </nav>

        <!-- Detail panel -->
        <Transition :name="slideDir === 'down' ? 'panel-down' : 'panel-up'" mode="out-in">
          <article
            :key="selected.id"
            class="rounded-2xl border border-(--border) bg-(--bg-card) p-6 xl:p-7"
          >
            <!-- Header -->
            <p class="text-[10px] font-semibold uppercase tracking-[0.16em] text-(--text-3)">
              {{ selected.period }}
            </p>
            <h3 class="mt-1 text-xl font-semibold tracking-tight text-(--text-1)">
              {{ selected.role }}
            </h3>
            <p class="mt-1 text-[13px] text-(--text-2)">{{ selected.company }}</p>

            <div class="my-5 h-px w-full bg-(--border)" />

            <!-- Bullets -->
            <ul class="mb-5 flex flex-col gap-3">
              <li
                v-for="(d, idx) in selected.description"
                :key="d"
                class="detail-item flex items-start gap-2.5 text-[13px] leading-relaxed text-(--text-2)"
                :style="{ animationDelay: `${idx * 0.06 + 0.04}s` }"
              >
                <i class="ti ti-circle-check mt-0.5 shrink-0 text-[14px] text-(--text-1)" aria-hidden="true" />
                <span>{{ d }}</span>
              </li>
            </ul>

            <!-- Tech chips -->
            <div v-if="selected.techStack?.length" class="flex flex-wrap gap-1.5">
              <span
                v-for="t in selected.techStack"
                :key="t"
                class="rounded-full border border-(--border) bg-(--bg-subtle) px-2.5 py-0.5 text-[11px] text-(--text-3)"
              >
                {{ t }}
              </span>
            </div>
          </article>
        </Transition>
      </div>

      <!-- ── Mobile: accordion ─────────────────────────────────────────── -->
      <ol class="relative mx-auto flex max-w-2xl flex-col gap-2 lg:hidden">
        <span class="pointer-events-none absolute left-4.5 top-5 bottom-5 w-px bg-(--border)" />

        <li
          v-for="(exp, i) in experiences"
          :key="exp.id"
          class="relative pl-12"
        >
          <!-- Dot -->
          <span
            class="absolute left-1 top-4 flex h-5.5 w-5.5 cursor-pointer items-center justify-center rounded-full border font-mono text-[9px] transition-all duration-200"
            :class="expandedId === exp.id
              ? 'border-(--text-1) bg-(--text-1) text-(--bg-card)'
              : 'border-(--border) bg-(--bg-card) text-(--text-3)'"
            @click="toggleMobile(exp.id)"
          >
            {{ String(i + 1).padStart(2, '0') }}
          </span>

          <div
            class="rounded-2xl border bg-(--bg-card) transition-colors duration-200"
            :class="expandedId === exp.id ? 'border-(--border)' : 'border-(--border)'"
          >
            <!-- Summary -->
            <button
              class="flex w-full items-center justify-between gap-3 p-4 text-left"
              :aria-expanded="expandedId === exp.id"
              @click="toggleMobile(exp.id)"
            >
              <div>
                <span class="block text-[10px] font-semibold uppercase tracking-[0.12em] text-(--text-3)">
                  {{ exp.period }}
                </span>
                <span class="mt-0.5 block text-[13px] font-medium text-(--text-1)">
                  {{ exp.role }}
                </span>
                <span class="block text-[11px] text-(--text-2)">{{ exp.company }}</span>
              </div>
              <ChevronDown
                :size="15"
                class="shrink-0 text-(--text-3) transition-transform duration-300"
                :class="expandedId === exp.id ? 'rotate-180' : ''"
              />
            </button>

            <!-- Accordion body -->
            <Transition
              :css="false"
              @enter="onAccordionEnter"
              @after-enter="onAccordionAfterEnter"
              @leave="onAccordionLeave"
            >
              <div v-if="expandedId === exp.id">
                <div class="border-t border-(--border) px-4 pb-5 pt-4">
                  <ul class="mb-4 flex flex-col gap-2.5">
                    <li
                      v-for="d in exp.description"
                      :key="d"
                      class="flex items-start gap-2.5 text-[13px] leading-relaxed text-(--text-2)"
                    >
                      <i class="ti ti-circle-check mt-0.5 shrink-0 text-[13px] text-(--text-1)" aria-hidden="true" />
                      <span>{{ d }}</span>
                    </li>
                  </ul>
                  <div v-if="exp.techStack?.length" class="flex flex-wrap gap-1.5">
                    <span
                      v-for="t in exp.techStack"
                      :key="t"
                      class="rounded-full border border-(--border) bg-(--bg-subtle) px-2.5 py-0.5 text-[11px] text-(--text-3)"
                    >
                      {{ t }}
                    </span>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </li>
      </ol>

    </div>
  </section>
</template>

<style scoped>
.panel-down-enter-active,
.panel-down-leave-active,
.panel-up-enter-active,
.panel-up-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.panel-down-enter-from { opacity: 0; transform: translateY(16px); }
.panel-down-leave-to   { opacity: 0; transform: translateY(-16px); }
.panel-up-enter-from   { opacity: 0; transform: translateY(-16px); }
.panel-up-leave-to     { opacity: 0; transform: translateY(16px); }

@keyframes detail-in {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: none; }
}
.detail-item {
  opacity: 0;
  animation: detail-in 0.3s ease forwards;
}

@media (prefers-reduced-motion: reduce) {
  .detail-item { animation: none; opacity: 1; }
  .panel-down-enter-active,
  .panel-down-leave-active,
  .panel-up-enter-active,
  .panel-up-leave-active { transition: none; }
}
</style>
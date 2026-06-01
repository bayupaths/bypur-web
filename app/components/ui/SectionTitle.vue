<script setup lang="ts">
import { Sparkles } from '@lucide/vue'

defineProps<{
  /** Small uppercase label above the title (e.g. "Skills", "Projects") */
  kicker: string
  /** Plain heading text before the accent */
  title: string
  /** Optional accent-colored suffix of the heading */
  accent?: string
  /** Optional description below the heading. Use the `description` slot for richer content. */
  description?: string
}>()
</script>

<template>
  <div class="mx-auto mb-12 max-w-2xl text-center">
    <div class="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--bg-card)/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-(--accent) backdrop-blur-sm">
      <Sparkles :size="12" aria-hidden="true" />
      {{ kicker }}
    </div>
    <h2 class="text-3xl font-bold tracking-tight text-(--text-1) sm:text-4xl lg:text-[2.5rem]">
      {{ title }}
      <span v-if="accent" class="text-(--accent)">{{ accent }}</span>
    </h2>
    <p
      v-if="description || $slots.description"
      class="mt-4 text-sm leading-relaxed text-(--text-2) sm:text-base"
    >
      <slot name="description">{{ description }}</slot>
    </p>
  </div>
</template>

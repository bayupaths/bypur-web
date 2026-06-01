<!-- components/sections/SkillCard.vue -->
<script setup lang="ts">
import type { LucideIcon } from '@lucide/vue'
import type { Skill } from '~/types'

interface Tile {
  title:   string
  icon:    LucideIcon
  desc:    string
  primary: string
}

defineProps<{
  tile:  Tile
  chips: Skill[]
}>()
</script>

<template>
  <div class="flex h-full flex-col gap-4">

    <!-- Header -->
    <div class="flex items-start justify-between gap-2">
      <div class="flex items-center gap-2.5">
        <span
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--accent-muted)"
        >
          <component :is="tile.icon" :size="14" class="text-(--accent)" aria-hidden="true" />
        </span>
        <p class="text-sm font-semibold text-(--text-1)">{{ tile.title }}</p>
      </div>

      <span class="rounded-full bg-(--bg-subtle) px-2 py-0.5 font-mono text-[10px] text-(--text-3)">
        {{ chips.length }}
      </span>
    </div>

    <!-- Primary -->
    <div>
      <p class="mb-0.5 text-[10px] font-medium uppercase tracking-widest text-(--text-3)">
        {{ tile.primary === 'Claude' ? 'Daily driver' : 'Primary' }}
      </p>
      <p class="text-2xl font-bold tracking-tight text-(--text-1)">
        {{ tile.primary }}
      </p>
      <p class="mt-0.5 text-xs text-(--text-3)">{{ tile.desc }}</p>
    </div>

    <!-- Divider -->
    <div class="h-px w-full bg-(--border)" />

    <!-- Chips -->
    <ul class="flex flex-wrap gap-1.5" :aria-label="`${tile.title} skills`">
      <li
        v-for="(s, idx) in chips"
        :key="s.name"
        class="inline-flex cursor-default items-center rounded-full px-2.5 py-0.5 text-[11px] transition-colors"
        :class="idx === 0
          ? 'bg-(--accent-muted) font-semibold text-(--accent)'
          : 'bg-(--bg-subtle) text-(--text-2) hover:text-(--text-1)'"
      >
        {{ s.name }}
      </li>
    </ul>

  </div>
</template>
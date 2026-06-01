<script setup lang="ts">
defineProps<{
  icon: Component
  label?: string
}>()
</script>

<template>
  <div
    class="flex items-center gap-2 rounded-xl border border-(--border) bg-(--bg-card)/90 px-3 py-2 text-xs font-semibold text-(--text-1) backdrop-blur-md"
  >
    <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-(--accent)/12 text-(--accent)">
      <component :is="icon" :size="12" />
    </span>
    <slot>{{ label }}</slot>
  </div>
</template>

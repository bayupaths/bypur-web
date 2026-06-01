<script setup lang="ts">
defineProps<{
  icon: Component
  title: string
  desc: string
}>()
</script>

<template>
  <div class="group relative overflow-hidden rounded-2xl border border-(--border) bg-(--bg-card)/60 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-(--accent)/40 hover:bg-(--bg-card)">
    <!-- Hover glow -->
    <div class="pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-(--accent)/0 blur-2xl transition-colors duration-300 group-hover:bg-(--accent)/15" />

    <div class="relative flex flex-col gap-3">
      <span class="flex h-10 w-10 items-center justify-center rounded-xl border border-(--border) bg-(--accent)/10 text-(--accent)">
        <component :is="icon" :size="18" />
      </span>
      <div class="flex flex-col gap-1.5">
        <h3 class="text-sm font-semibold text-(--text-1)">{{ title }}</h3>
        <p class="text-[13px] leading-relaxed text-(--text-2)">{{ desc }}</p>
      </div>
    </div>
  </div>
</template>

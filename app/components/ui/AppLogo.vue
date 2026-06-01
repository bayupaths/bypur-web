<script setup lang="ts">
withDefaults(defineProps<{ height?: number }>(), { height: 40 })
</script>

<template>
  <span
    class="inline-flex items-center font-mono font-bold tracking-tight select-none"
    :style="{ fontSize: `${height}px`, lineHeight: 1 }"
    aria-label="by.pur_ logo"
  >
    <span class="text-(--accent)">&gt;</span>
    <span class="text-(--text-1)">by.pur</span>
    <span class="text-(--accent)">_</span>
  </span>
</template>


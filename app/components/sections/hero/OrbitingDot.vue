<script setup lang="ts">
defineProps<{
  icon: Component
}>()
</script>

<template>
  <div class="hidden sm:flex h-8 w-8 items-center justify-center rounded-full border border-(--border) bg-(--bg-card)/90 backdrop-blur-md">
    <component :is="icon" :size="13" class="text-(--accent)" />
  </div>
</template>

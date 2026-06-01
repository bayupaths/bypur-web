<script setup lang="ts">
interface Props {
  size?: 'xs' | 'sm'
}

const { size = 'xs' } = defineProps<Props>()

const sizeClass = size === 'xs' ? 'h-1.5 w-1.5' : 'h-2 w-2'
</script>

<template>
  <span class="relative flex" :class="sizeClass">
    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--accent) opacity-75" />
    <span class="relative inline-flex rounded-full bg-(--accent)" :class="sizeClass" />
  </span>
</template>

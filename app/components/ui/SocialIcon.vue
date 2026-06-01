<script setup lang="ts">
import type { Component } from 'vue'

interface Props {
  icon?: Component
  svgPath?: string
  size?: number
}

const { size = 15 } = defineProps<Props>()
</script>

<template>
  <component
    :is="icon"
    v-if="icon"
    :size="size"
  />
  <svg
    v-else-if="svgPath"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="h-3.5 w-3.5"
  >
    <path :d="svgPath" />
  </svg>
</template>

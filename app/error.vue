<template>
  <div>
    <h1>{{ error?.statusCode }} - {{ error?.message }}</h1>
    <button @click="handleError">Back to Home</button>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

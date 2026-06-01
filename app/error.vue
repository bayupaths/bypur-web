<script setup lang="ts">
import { ArrowLeft, Home, RotateCcw } from '@lucide/vue'
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const route = useRoute()

const statusCode = computed(() => props.error?.statusCode ?? 500)

const errorMeta = computed(() => {
  switch (statusCode.value) {
    case 404:
      return {
        title: 'Page not found',
        message: 'The page you are looking for has moved, been deleted, or never existed in the first place.',
      }
    case 403:
      return {
        title: 'Access denied',
        message: 'You do not have permission to view this page.',
      }
    case 500:
      return {
        title: 'Something broke',
        message: 'An unexpected error occurred on the server. Please try again in a moment.',
      }
    default:
      return {
        title: 'Something went wrong',
        message: props.error?.message || 'An unexpected error occurred.',
      }
  }
})

useSeoMeta({
  title: () => `${statusCode.value} — ${errorMeta.value.title}`,
  description: () => errorMeta.value.message,
  robots: 'noindex',
})

const handleHome = () => clearError({ redirect: '/' })
const handleRetry = () => clearError({ redirect: route.fullPath })
</script>

<template>
  <NuxtLayout>
    <main class="container-main relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center py-20 text-center">
      <!-- Ambient glow -->
      <div class="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--accent)/10 blur-3xl" />

      <!-- Status badge -->
      <span class="mb-6 inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--bg-subtle)/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-(--text-3)">
        <UiPulseDot />
        Error {{ statusCode }}
      </span>

      <!-- Big number -->
      <p class="bg-linear-to-b from-(--text-1) to-(--text-3)/40 bg-clip-text text-[8rem] font-black leading-none tracking-tighter text-transparent sm:text-[12rem]">
        {{ statusCode }}
      </p>

      <!-- Title -->
      <h1 class="mt-2 text-3xl font-black tracking-tight text-(--text-1) sm:text-4xl">
        {{ errorMeta.title }}
      </h1>

      <!-- Message -->
      <p class="mt-4 max-w-md text-sm leading-relaxed text-(--text-3) sm:text-base">
        {{ errorMeta.message }}
      </p>

      <!-- Actions -->
      <div class="mt-8 flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded-full bg-(--accent) px-5 py-2.5 text-sm font-medium text-(--accent-fg) shadow-sm shadow-(--accent)/25 transition-all hover:bg-(--accent-hover) hover:shadow-md hover:shadow-(--accent)/30"
          @click="handleHome"
        >
          <Home :size="14" />
          Back to home
        </button>

        <button
          v-if="statusCode >= 500"
          type="button"
          class="inline-flex items-center gap-1.5 rounded-full border border-(--border) bg-(--bg-subtle)/50 px-5 py-2.5 text-sm font-medium text-(--text-2) transition-all hover:border-(--accent)/40 hover:text-(--text-1)"
          @click="handleRetry"
        >
          <RotateCcw :size="14" />
          Try again
        </button>

        <NuxtLink
          v-else
          to="#contact"
          class="group inline-flex items-center gap-1.5 rounded-full border border-(--border) bg-(--bg-subtle)/50 px-5 py-2.5 text-sm font-medium text-(--text-2) transition-all hover:border-(--accent)/40 hover:text-(--text-1)"
        >
          <ArrowLeft :size="14" class="transition-transform group-hover:-translate-x-0.5" />
          Get in touch
        </NuxtLink>
      </div>
    </main>
  </NuxtLayout>
</template>

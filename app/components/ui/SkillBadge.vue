<script setup lang="ts">
withDefaults(
  defineProps<{
    /** Small (10px) for dense lists, base (11px) for prominent chips */
    size?: 'sm' | 'base'
  }>(),
  { size: 'sm' },
)
</script>

<template>
  <span
    :class="[
      'inline-flex items-center rounded-full border border-(--border) bg-(--bg-subtle)/60 font-medium text-(--text-3)',
      size === 'sm' ? 'px-2.5 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]',
    ]"
  >
    <slot />
  </span>
</template>

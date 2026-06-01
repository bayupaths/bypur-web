<script setup lang="ts">
const navLinks = useNavLinks();
const { activeSection } = useScrollSpy(['hero', 'about', 'skills', 'projects', 'experience', 'contact']);
</script>

<template>
  <nav aria-label="Main navigation">
    <ul class="flex items-center gap-0.5">
      <li v-for="link in navLinks" :key="link.to">
        <a
          :href="link.to"
          class="relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 text-(--text-3) hover:bg-(--bg-subtle)/60 hover:text-(--text-1)"
          :class="activeSection === link.section ? 'bg-(--accent)/10! text-(--accent)!' : ''"
        >
          {{ link.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>

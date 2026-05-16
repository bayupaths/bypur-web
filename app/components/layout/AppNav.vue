<template>
  <ul class="flex gap-6">
    <li v-for="link in navLinks" :key="link.href">
      <a :href="link.href">{{ link.label }}</a>
    </li>
  </ul>
</template>

<script setup lang="ts">
const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]
</script>

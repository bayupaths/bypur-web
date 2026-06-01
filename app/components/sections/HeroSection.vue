<script setup lang="ts">
import { Sparkles, ArrowRight, Code2, Server, Layers, Database, Cpu, Bot } from '@lucide/vue'

const { data: profile } = await useProfile()

// Icon mapping — kept client-side since icons can't be serialized
const iconMap: Record<string, Component> = {
  'Fullstack Developer': Layers,
  'Backend Engineer':    Server,
  'Laravel Specialist':  Code2,
  'API Architect':       Server,
  'AI-Powered Builder':  Bot,
  'Laravel':             Code2,
  'Vue / Nuxt':          Layers,
  'Node.js':             Server,
  'PostgreSQL':          Database,
  'AI Agents':           Bot,
  'Scalable':            Cpu,
}

// Icon name → component (used by highlights from API)
const componentMap: Record<string, Component> = {
  Server, Code2, Layers, Database, Cpu,
}

const resolveIcon = (name: string) => componentMap[name] ?? Code2

const toIconItem = (label: string) => ({ label, icon: iconMap[label] ?? Code2 })

const roles = computed(() => (profile.value?.roles ?? []).map(toIconItem))

const roleIndex  = ref(0)
const currentRole = computed(() => roles.value[roleIndex.value] ?? roles.value[0]!)
let roleTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  roleTimer = setInterval(() => {
    roleIndex.value = (roleIndex.value + 1) % (roles.value.length || 1)
  }, 2800)
})

onUnmounted(() => {
  if (roleTimer) clearInterval(roleTimer)
})

const avatarFailed = ref(false)
</script>

<template>
  <section
    id="hero"
    class="relative isolate flex min-h-svh items-center overflow-hidden pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24"
  >
    <!-- Accent glow -->
    <div class="pointer-events-none absolute -top-32 left-1/2 -z-10 h-125 w-125 -translate-x-1/2 rounded-full bg-(--accent)/10 blur-[80px]" />

    <div class="container-main">
      <div class="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">

        <!-- LEFT -->
        <div class="flex flex-col gap-0 text-center lg:text-left animate-fade-up">

          <!-- Headline -->
          <h1 class="mb-4 text-4xl font-bold leading-[1.06] tracking-[-0.03em] text-(--text-1) sm:text-5xl lg:text-[3.25rem]">
            Hi, I'm {{ profile?.name?.split(' ')[0] }} —
            <span class="mt-1.5 block text-(--text-2) font-normal">
              I craft
              <span class="font-bold text-(--text-1)">scalable</span>
              digital products.
            </span>
          </h1>

          <!-- Rotating role chip -->
          <div class="mb-5 flex flex-wrap items-center justify-center gap-2 text-sm text-(--text-2) lg:justify-start">
            <Sparkles :size="14" class="text-(--accent)" />
            Currently working as
            <Transition
              enter-active-class="transition-all duration-300"
              enter-from-class="opacity-0 -translate-y-1 scale-95"
              leave-active-class="transition-all duration-200 absolute"
              leave-to-class="opacity-0 translate-y-1 scale-95"
              mode="out-in"
            >
              <span
                :key="roleIndex"
                class="inline-flex items-center gap-1.5 rounded-md border border-(--accent)/25 bg-(--accent)/10 px-2.5 py-0.5 text-xs font-semibold text-(--accent)"
              >
                <component :is="currentRole.icon" :size="11" />
                {{ currentRole.label }}
              </span>
            </Transition>
          </div>

          <!-- Bio -->
          <p class="mb-6 mx-auto max-w-lg text-sm leading-[1.8] text-(--text-2) sm:text-[15px] lg:mx-0">
            {{ profile?.bio }}
          </p>

          <!-- CTA -->
          <div class="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a href="#projects" class="btn-primary group">
              View my work
              <ArrowRight :size="15" class="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" class="btn-secondary">Let's talk</a>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="relative mx-auto w-full max-w-70 sm:max-w-sm md:max-w-md lg:max-w-lg animate-fade-up [animation-delay:120ms]">
          <div class="relative aspect-square">

            <!-- Concentric ring decorators -->
            <div class="absolute inset-0 rounded-full border border-(--border)" />
            <div class="absolute inset-6 rounded-full border border-(--border)/60" />

            <!-- Accent glow behind avatar (layered for stronger presence) -->
            <div class="pointer-events-none absolute inset-4 -z-10 rounded-full bg-(--accent)/40 blur-3xl dark:inset-8 dark:bg-(--accent)/35 dark:blur-2xl" />
            <div class="pointer-events-none absolute inset-10 -z-10 rounded-full bg-(--accent)/25 blur-2xl dark:inset-14 dark:bg-(--accent-hover)/28 dark:blur-xl" />

            <!-- Avatar -->
            <img
              v-if="!avatarFailed && profile?.avatar"
              :src="profile.avatar"
              :alt="profile?.name"
              class="relative z-10 h-full w-full rounded-full object-cover ring-1 ring-(--border)"
              loading="eager"
              @error="avatarFailed = true"
            />
            <div
              v-else
              class="relative z-10 flex h-full w-full items-center justify-center rounded-full border border-(--border) bg-(--bg-subtle)"
            >
              <span class="font-mono text-6xl font-bold text-(--accent)/40 sm:text-7xl tracking-tighter">by.</span>
            </div>

            <!-- Floating badges -->
            <SectionsHeroFloatingBadge
              v-if="profile?.highlights?.[0]"
              :icon="resolveIcon(profile.highlights[0].icon)"
              :label="profile.highlights[0].label"
              class="absolute top-4 -left-4 z-20 animate-float-slow sm:-left-8"
            />
            <SectionsHeroFloatingBadge
              v-if="profile?.highlights?.[1]"
              :icon="resolveIcon(profile.highlights[1].icon)"
              :label="profile.highlights[1].label"
              class="absolute bottom-8 -right-4 z-20 animate-float sm:-right-8"
            />

            <!-- Orbiting dots -->
            <SectionsHeroOrbitingDot
              v-if="profile?.highlights?.[2]"
              :icon="resolveIcon(profile.highlights[2].icon)"
              class="absolute top-1/2 -translate-y-1/2 -right-3 z-20 animate-float-slower sm:-right-6"
            />
            <SectionsHeroOrbitingDot
              v-if="profile?.highlights?.[3]"
              :icon="resolveIcon(profile.highlights[3].icon)"
              class="absolute top-1/2 -translate-y-1/2 -left-3 z-20 animate-float-slow sm:-left-6"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}

.animate-float       { animation: float 4s ease-in-out infinite; }
.animate-float-slow  { animation: float 6s ease-in-out infinite; }
.animate-float-slower { animation: float 8s ease-in-out 1s infinite; }

@media (prefers-reduced-motion: reduce) {
  .animate-float,
  .animate-float-slow,
  .animate-float-slower { animation: none; }
}
</style>
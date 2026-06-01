<script setup lang="ts">
import { ArrowUpRight, Menu, Moon, Sun, X } from "@lucide/vue";

const SCROLL_THRESHOLD = 20;

const navLinks = useNavLinks();
const route = useRoute();
const { isDark, toggle: toggleTheme } = useTheme();

const isScrolled = ref(false);
const isMobileOpen = ref(false);

/**
 * Body scroll lock
 */
const setBodyScroll = (locked: boolean) => {
  document.body.classList.toggle("overflow-hidden", locked);
};

/**
 * Mobile menu
 */
const closeMobileMenu = () => {
  isMobileOpen.value = false;
};

const toggleMobileMenu = () => {
  isMobileOpen.value = !isMobileOpen.value;
};

/**
 * Header scroll state
 */
const handleScroll = () => {
  isScrolled.value = window.scrollY > SCROLL_THRESHOLD;
};

/**
 * Keyboard shortcuts
 */
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
};

/**
 * Sync body scroll with mobile menu state
 */
watch(isMobileOpen, (isOpen) => {
  setBodyScroll(isOpen);
});

/**
 * Auto-close mobile menu on route change
 */
watch(() => route.fullPath, closeMobileMenu);

/**
 * Lifecycle
 */
onMounted(() => {
  handleScroll();

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", handleKeydown);

  setBodyScroll(false);
});

/**
 * Computed classes
 */
const headerClass = computed(() =>
  isScrolled.value ? "pt-3 px-3 sm:px-4" : "pt-0 px-0",
);

const navbarClass = computed(() =>
  isScrolled.value
    ? "max-w-5xl rounded-2xl border-(--border) bg-(--bg)/85 shadow-lg shadow-black/5 backdrop-blur-xl"
    : "max-w-7xl border-transparent",
);

const themeLabel = computed(() =>
  isDark.value ? "Switch to light theme" : "Switch to dark theme",
);

const mobileMenuLabel = computed(() =>
  isMobileOpen.value ? "Close menu" : "Open menu",
);
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="headerClass"
  >
    <!-- Navbar -->
    <div
      class="mx-auto flex h-14 items-center justify-between gap-3 border px-4 transition-all duration-300 sm:h-16 sm:gap-4 sm:px-5"
      :class="navbarClass"
    >
      <!-- Logo -->
      <NuxtLink
        to="/"
        aria-label="Home"
        class="flex shrink-0 items-center transition-opacity hover:opacity-80"
      >
        <UiAppLogo :height="22" />
      </NuxtLink>

      <!-- Desktop Navigation -->
      <LayoutAppNav class="hidden md:flex" />

      <!-- Actions -->
      <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <!-- Theme Toggle -->
        <button
          type="button"
          :aria-label="themeLabel"
          class="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-(--border) bg-(--bg-subtle)/50 text-(--text-2) transition-all hover:border-(--accent)/40 hover:bg-(--bg-subtle) hover:text-(--text-1)"
          @click="toggleTheme"
        >
          <Sun
            :size="16"
            class="absolute transition-all duration-500"
            :class="
              isDark
                ? '-rotate-90 scale-0 opacity-0'
                : 'rotate-0 scale-100 opacity-100'
            "
          />

          <Moon
            :size="16"
            class="absolute transition-all duration-500"
            :class="
              isDark
                ? 'rotate-0 scale-100 opacity-100'
                : 'rotate-90 scale-0 opacity-0'
            "
          />
        </button>

        <!-- CTA -->
        <a
          href="#contact"
          class="group hidden h-9 items-center gap-1.5 rounded-full bg-(--accent) pl-4 pr-3 text-sm font-medium text-(--accent-fg) shadow-sm shadow-(--accent)/25 transition-all hover:bg-(--accent-hover) hover:shadow-md hover:shadow-(--accent)/30 sm:inline-flex"
        >
          Get in touch
        </a>

        <!-- Mobile Toggle -->
        <button
          type="button"
          :aria-label="mobileMenuLabel"
          :aria-expanded="isMobileOpen"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-(--border) bg-(--bg-subtle)/50 text-(--text-2) transition-all hover:border-(--accent)/40 hover:text-(--text-1) md:hidden"
          @click="toggleMobileMenu"
        >
          <Transition
            mode="out-in"
            enter-active-class="transition duration-200"
            leave-active-class="transition duration-200"
            enter-from-class="rotate-90 opacity-0"
            leave-to-class="-rotate-90 opacity-0"
          >
            <Menu v-if="!isMobileOpen" :size="16" />
            <X v-else :size="16" />
          </Transition>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      leave-active-class="transition duration-150 ease-in"
      enter-from-class="-translate-y-2 opacity-0"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <div
        v-if="isMobileOpen"
        class="mx-3 mt-2 origin-top overflow-hidden rounded-2xl border border-(--border) bg-(--bg)/95 shadow-xl shadow-black/10 backdrop-blur-xl md:hidden"
      >
        <nav class="flex flex-col p-2" aria-label="Mobile navigation">
          <a
            v-for="link in navLinks"
            :key="link.to"
            :href="link.to"
            class="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-(--text-2) transition-all hover:bg-(--bg-subtle) hover:text-(--text-1)"
            @click="closeMobileMenu"
          >
            {{ link.label }}
            <ArrowUpRight :size="14" class="text-(--text-3)" />
          </a>

          <a
            href="#contact"
            class="mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-(--accent) px-4 py-3 text-sm font-medium text-(--accent-fg) transition-colors hover:bg-(--accent-hover)"
            @click="closeMobileMenu"
          >
            Get in touch
            <ArrowUpRight :size="14" />
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Globe,
  Eye,
  X,
  ImageIcon,
} from "@lucide/vue";
import { projects } from "~/data/projects";
import type { Project } from "~/types";

const AUTO_PLAY_MS = 5_000;

// Filter
const activeFilter = ref("All");
const filterTabs = computed(() => {
  const set = new Set<string>();
  projects.forEach((p) => p.techStack.slice(0, 2).forEach((t) => set.add(t)));
  return ["All", ...Array.from(set).slice(0, 6)];
});
const filtered = computed(() =>
  activeFilter.value === "All"
    ? projects
    : projects.filter((p) => p.techStack.includes(activeFilter.value)),
);

// Carousel
const current = ref(0);
const sliding = ref(false);
const slideDir = ref<"next" | "prev">("next");
const dotKey = ref(0);
const activeProject = computed(() => filtered.value[current.value]);

watch(filtered, () => { current.value = 0 }, { flush: "sync" });
watch(filtered, startAuto);

function goTo(idx: number, dir: "next" | "prev" = "next") {
  if (sliding.value || idx === current.value) return;
  slideDir.value = dir;
  sliding.value = true;
  current.value = idx;
  dotKey.value++;
  setTimeout(() => { sliding.value = false }, 400);
}
const goPrev = () => goTo((current.value - 1 + filtered.value.length) % filtered.value.length, "prev");
const goNext = () => goTo((current.value + 1) % filtered.value.length, "next");

// Auto-play
const hovered = ref(false);
let autoTimer: ReturnType<typeof setInterval> | null = null;

function startAuto() {
  stopAuto();
  if (filtered.value.length <= 1) return;
  autoTimer = setInterval(() => { if (!hovered.value) goNext() }, AUTO_PLAY_MS);
}
function stopAuto() {
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
}

// Touch
let touchX = 0;
const onTouchStart = (e: TouchEvent) => { touchX = e.touches[0]?.clientX ?? 0 };
const onTouchEnd = (e: TouchEvent) => {
  const dx = touchX - (e.changedTouches[0]?.clientX ?? touchX);
  if (dx > 50) goNext();
  if (dx < -50) goPrev();
};

// Modal
const modal = ref<Project | null>(null);

function openModal(p: Project) {
  modal.value = p;
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.value = null;
  document.body.style.overflow = "";
}

// Keyboard
function onKeyDown(e: KeyboardEvent) {
  if (e.key === "ArrowLeft") goPrev();
  if (e.key === "ArrowRight") goNext();
  if (e.key === "Escape") closeModal();
}

onMounted(() => {
  startAuto();
  window.addEventListener("keydown", onKeyDown);
});

onUnmounted(() => {
  stopAuto();
  window.removeEventListener("keydown", onKeyDown);
  document.body.style.overflow = "";
});
</script>

<template>
  <section
    id="projects"
    class="relative isolate overflow-hidden py-20 sm:py-24 lg:py-32"
  >
    <!-- Dot-grid -->
    <div class="dot-grid pointer-events-none absolute inset-0 -z-10" />

    <div class="container-main">
      <UiSectionTitle
        kicker="Projects"
        title="Selected work"
        accent="I'm proud of."
        description="A few projects that capture how I think about product, architecture, and craft."
      />

      <!-- Filter chips -->
      <div class="mb-8 flex flex-wrap items-center justify-center gap-1.5">
        <button
          v-for="tab in filterTabs"
          :key="tab"
          class="rounded-full border px-3.5 py-1 text-[11px] font-medium tracking-wide transition-all duration-150"
          :class="activeFilter === tab
            ? 'border-(--accent) bg-(--accent) text-(--accent-fg)'
            : 'border-(--border) text-(--text-3) hover:border-(--text-3) hover:text-(--text-2)'"
          @click="activeFilter = tab"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Carousel -->
      <div
        class="relative"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <div class="overflow-hidden rounded-2xl border border-(--border) bg-(--bg-card)">
          <Transition :name="slideDir === 'next' ? 'slide-left' : 'slide-right'" mode="out-in">

            <!-- Project slide -->
            <div
              v-if="filtered.length > 0"
              :key="filtered[current]?.id"
              class="grid lg:grid-cols-[52%_48%]"
            >
              <!-- Image pane -->
              <div class="relative aspect-video overflow-hidden bg-(--bg-subtle) lg:aspect-auto lg:min-h-88">
                <img
                  v-if="activeProject?.imageUrl"
                  :src="activeProject.imageUrl"
                  :alt="activeProject.title"
                  loading="lazy"
                  class="h-full w-full object-cover"
                  @error="(e) => ((e.target as HTMLImageElement).style.display = 'none')"
                />
                <div class="absolute inset-0 flex items-center justify-center">
                  <ImageIcon :size="36" class="text-(--text-3) opacity-10" />
                </div>

                <!-- Overlays -->
                <div class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                <div class="absolute inset-0 hidden bg-linear-to-r from-transparent to-(--bg-card)/50 lg:block" />

                <!-- Index chip -->
                <div class="absolute left-3.5 top-3.5 flex items-center gap-1 rounded-full border border-(--border) bg-(--bg-card)/70 px-2.5 py-1 text-[10px] font-semibold backdrop-blur-sm tabular-nums">
                  <span class="text-(--accent)">{{ String(current + 1).padStart(2, "0") }}</span>
                  <span class="text-(--text-3)">/</span>
                  <span class="text-(--text-2)">{{ String(filtered.length).padStart(2, "0") }}</span>
                </div>
              </div>

              <!-- Content pane -->
              <div class="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 class="mb-2 text-xl font-bold leading-snug text-(--text-1)">
                    {{ activeProject?.title }}
                  </h3>
                  <p class="text-[13px] leading-relaxed text-(--text-2)">
                    {{ activeProject?.description }}
                  </p>

                  <!-- Stack chips -->
                  <div class="mt-4 flex flex-wrap gap-1.5">
                    <span
                      v-for="tech in activeProject?.techStack"
                      :key="tech"
                      class="rounded-full border border-(--border) bg-(--bg-subtle) px-2.5 py-0.5 text-[10px] font-medium text-(--text-3)"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <!-- Actions -->
                <div class="mt-6 flex flex-wrap items-center gap-2">
                  <button
                    class="inline-flex items-center gap-1.5 rounded-full bg-(--accent) px-4 py-2 text-[11px] font-semibold text-(--accent-fg) transition-all duration-150 hover:bg-(--accent-hover) active:scale-95"
                    @click="activeProject && openModal(activeProject)"
                  >
                    <Eye :size="11" />
                    Quick Look
                  </button>
                  <a
                    v-if="activeProject?.liveUrl"
                    :href="activeProject.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 rounded-full border border-(--border) px-4 py-2 text-[11px] font-medium text-(--text-2) transition-all duration-150 hover:border-(--text-3) hover:text-(--text-1)"
                  >
                    <Globe :size="11" />
                    Live
                  </a>
                  <a
                    v-if="activeProject?.repoUrl"
                    :href="activeProject.repoUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 rounded-full border border-(--border) px-4 py-2 text-[11px] font-medium text-(--text-2) transition-all duration-150 hover:border-(--text-3) hover:text-(--text-1)"
                  >
                    <Code2 :size="11" />
                    Code
                  </a>
                </div>
              </div>
            </div>

            <!-- Empty state -->
            <div
              v-else
              key="empty"
              class="flex min-h-72 items-center justify-center p-10 text-center"
            >
              <p class="text-sm text-(--text-3)">No projects match this filter.</p>
            </div>

          </Transition>
        </div>

        <!-- Prev / Next arrows -->
        <template v-if="filtered.length > 1">
          <button
            class="absolute -left-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-(--border) bg-(--bg-card) text-(--text-3) shadow-sm transition-all duration-150 hover:border-(--text-3) hover:text-(--text-1) sm:-left-5"
            aria-label="Previous project"
            @click="goPrev"
          >
            <ChevronLeft :size="15" />
          </button>
          <button
            class="absolute -right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-(--border) bg-(--bg-card) text-(--text-3) shadow-sm transition-all duration-150 hover:border-(--text-3) hover:text-(--text-1) sm:-right-5"
            aria-label="Next project"
            @click="goNext"
          >
            <ChevronRight :size="15" />
          </button>
        </template>
      </div>

      <!-- Dot indicators -->
      <div v-if="filtered.length > 1" class="mt-5 flex items-center justify-center gap-1.5">
        <button
          v-for="(_, i) in filtered"
          :key="i"
          class="relative h-0.75 overflow-hidden rounded-full transition-all duration-300"
          :class="i === current
            ? 'w-7 bg-(--border)'
            : 'w-1.5 bg-(--border) opacity-40 hover:opacity-70'"
          :aria-label="`Go to project ${i + 1}`"
          @click="goTo(i, i > current ? 'next' : 'prev')"
        >
          <span
            v-if="i === current && !hovered"
            :key="dotKey"
            class="dot-fill absolute inset-y-0 left-0 rounded-full bg-(--accent)"
          />
          <span
            v-else-if="i === current"
            class="absolute inset-y-0 left-0 w-full rounded-full bg-(--accent)"
          />
        </button>
      </div>

      <!-- Thumbnail strip -->
      <div
        v-if="filtered.length > 1"
        class="no-scrollbar mt-4 flex justify-center gap-2 overflow-x-auto pb-0.5"
      >
        <button
          v-for="(p, i) in filtered"
          :key="p.id"
          class="relative h-12 w-18 shrink-0 overflow-hidden rounded-lg border transition-all duration-200"
          :class="i === current
            ? 'border-(--accent) scale-[1.06]'
            : 'border-(--border) opacity-40 hover:opacity-75 hover:scale-[1.03]'"
          :aria-label="`Go to ${p.title}`"
          @click="goTo(i, i > current ? 'next' : 'prev')"
        >
          <img
            v-if="p.imageUrl"
            :src="p.imageUrl"
            :alt="p.title"
            class="h-full w-full object-cover"
          />
          <div
            class="absolute inset-0 flex items-end p-1"
            :class="i === current ? 'bg-black/15' : 'bg-black/45'"
          >
            <span class="line-clamp-2 text-[9px] font-semibold leading-tight text-white/90">
              {{ p.title }}
            </span>
          </div>
        </button>
      </div>
    </div>

    <!-- Quick Look Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="modal"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          :aria-label="modal.title"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-(--text-1)/50 backdrop-blur-sm" @click="closeModal" />

          <!-- Panel -->
          <div class="modal-panel relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-(--border) bg-(--bg-card) shadow-2xl">

            <!-- Image header -->
            <div class="relative aspect-video overflow-hidden bg-(--bg-subtle)">
              <img
                v-if="modal.imageUrl"
                :src="modal.imageUrl"
                :alt="modal.title"
                class="h-full w-full object-cover"
              />
              <div class="absolute inset-0 flex items-center justify-center">
                <ImageIcon :size="36" class="text-(--text-3) opacity-10" />
              </div>
              <div class="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              <button
                class="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-(--border) bg-(--bg-card)/70 text-(--text-2) backdrop-blur-sm transition-colors hover:text-(--text-1)"
                aria-label="Close"
                @click="closeModal"
              >
                <X :size="13" />
              </button>
            </div>

            <!-- Body -->
            <div class="p-6">
              <h3 class="mb-2 text-lg font-bold text-(--text-1)">{{ modal.title }}</h3>
              <p class="text-[13px] leading-relaxed text-(--text-2)">{{ modal.description }}</p>

              <div class="mt-5">
                <p class="mb-2 text-[9px] font-semibold uppercase tracking-widest text-(--text-3)">
                  Tech Stack
                </p>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="t in modal.techStack"
                    :key="t"
                    class="rounded-full border border-(--accent)/25 bg-(--accent-muted) px-2.5 py-0.5 text-[10px] font-medium text-(--accent)"
                  >
                    {{ t }}
                  </span>
                </div>
              </div>

              <div class="mt-5 flex flex-wrap items-center gap-2 border-t border-(--border) pt-5">
                <a
                  v-if="modal.liveUrl"
                  :href="modal.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 rounded-full bg-(--accent) px-4 py-2 text-[11px] font-semibold text-(--accent-fg) transition-all hover:bg-(--accent-hover)"
                >
                  <Globe :size="11" />
                  View Live
                </a>
                <a
                  v-if="modal.repoUrl"
                  :href="modal.repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 rounded-full border border-(--border) px-4 py-2 text-[11px] font-medium text-(--text-2) transition-all hover:border-(--text-3) hover:text-(--text-1)"
                >
                  <Code2 :size="11" />
                  Source Code
                </a>
                <span
                  v-if="!modal.liveUrl && !modal.repoUrl"
                  class="text-[12px] italic text-(--text-3)"
                >
                  Private project — links unavailable.
                </span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
/* Dot-grid background */
.dot-grid {
  opacity: 0.035;
  background-image: radial-gradient(circle, var(--text-1) 1px, transparent 1px);
  background-size: 28px 28px;
}

/* Slide transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.22s ease, transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  transform: translateX(36px);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-36px);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-36px);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(36px);
  opacity: 0;
}

/* Modal transition */
.modal-enter-active {
  transition: opacity 0.2s ease;
}

.modal-leave-active {
  transition: opacity 0.15s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-panel {
  transition: transform 0.25s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.2s ease;
}

.modal-leave-active .modal-panel {
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.modal-enter-from .modal-panel {
  transform: scale(0.94) translateY(10px);
  opacity: 0;
}

.modal-leave-to .modal-panel {
  transform: scale(0.97);
  opacity: 0;
}

/* Auto-play dot */
@keyframes dot-fill {
  from {
    width: 0%
  }

  to {
    width: 100%
  }
}

.dot-fill {
  animation: dot-fill 5s linear forwards;
}

/* Hide scrollbar */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
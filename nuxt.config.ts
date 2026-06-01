import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
// Environment-based devtools configuration
const isProduction = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: !isProduction },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
    head: {
      htmlAttrs: { class: "dark" },
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "theme-color",
          content: "#09090b",
          media: "(prefers-color-scheme: dark)",
        },
        {
          name: "theme-color",
          content: "#ffffff",
          media: "(prefers-color-scheme: light)",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/favicon-96x96.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@700&family=Inter:ital,opsz,wght@0,14..32,300..800;1,14..32,300..800&display=swap",
        },
      ],
      script: [
        {
          // Prevent FOWT (Flash of Wrong Theme) — runs before first paint
          innerHTML: `!function(){try{var t=localStorage.getItem("theme"),d=null===t?window.matchMedia("(prefers-color-scheme: dark)").matches:"dark"===t;document.documentElement.classList.toggle("dark",d)}catch(e){}}()`,
          tagPosition: "head",
        },
      ],
    },
  },
  modules: ["@nuxtjs/google-fonts"],
  runtimeConfig: {
    apiKey: '',
    public: {
      apiBase: '',
    },
  },
  googleFonts: {
    families: {
      Geist: [400, 500, 600, 700], // ganti nama di sini
    },
    display: "swap",
    preload: true,
    download: true,
  },
});

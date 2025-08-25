import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  ssr: false,
  nitro: { preset: "static" },
  app: { baseURL: "/devnotepad/" },
  modules: [
    "@nuxt/icon",
    "@vueuse/nuxt",
    "@vite-pwa/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Roboto: true,
          Inter: [400, 700],
          Lato: [100, 300],
        },
      },
    ],
  ],
  css: ["@/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false,
    },
  },
  icon: {
    serverBundle: {
      collections: ["mdi", "hugeicons"],
    },
  },
  pwa: {
    registerType: "autoUpdate",
    manifest: {
      name: "Dev Notepad",
      short_name: "Notepad",
      description: "A simple and useful notepad for developers.",
      theme_color: "#42b883",
      background_color: "#ffffff",
      display: "standalone",
      start_url: "/",
    },
  },
});

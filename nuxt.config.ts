// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/icon",
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
  },
  icon: {
    serverBundle: {
      collections: ["mdi"],
    },
  },
});

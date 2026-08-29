import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@vueuse/nuxt", "@nuxtjs/i18n"],
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  /** i18n configuration */
  i18n: {
    defaultLocale: "br",
    langDir: "locales",
    strategy: "prefix",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "es", name: "Español", file: "es.json" },
      { code: "br", name: "Brasil", file: "br.json" },
    ],
  },

  nitro: {
    experimental: {
      websocket: true,
    },
  },
});

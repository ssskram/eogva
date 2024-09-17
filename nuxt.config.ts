export default defineNuxtConfig({
  build: {
    transpile: ["@pinia/nuxt"],
  },
  compatibilityDate: "2024-09-17",
  css: ["@/assets/css/main.css"],
  devtools: { enabled: true },
  plugins: ["~/plugins/pinia.js"],
  routeRules: {
    "/": { prerender: true },
  },
  ssr: false,
});

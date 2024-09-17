export default defineNuxtConfig({
  css: ["@/assets/css/main.css"],
  devtools: { enabled: true },
  routeRules: {
    "/": { prerender: true },
  },
  compatibilityDate: "2024-09-17",
});

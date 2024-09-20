export default defineNuxtConfig({
  build: {
    transpile: ["@pinia/nuxt"],
  },
  app: {
    head: {
      title: 'GVA Earth Observation',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Geovisual Analytics Earth Observation' }
      ]
    }
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

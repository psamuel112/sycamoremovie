import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  devtools: { enabled: true },

  ssr: false, // disable SSR, fully client-side static site

  nitro: {
    preset: 'static' // generate static output for deployment
  },

  runtimeConfig: {
    public: {
      TMDB_API_KEY: process.env.TMDB_API_KEY,
      TMDB_BASE_URL: process.env.TMDB_BASE_URL
    }
  },

  compatibilityDate: '2025-07-15'
})

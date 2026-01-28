import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
    public: {
      TMDB_API_KEY: process.env.TMDB_API_KEY,
      TMDB_BASE_URL: process.env.TMDB_BASE_URL
    }
  },
  compatibilityDate: '2025-07-15',
css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    
  ],
  
  devtools: { enabled: true }
})

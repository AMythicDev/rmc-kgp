import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "vue-final-modal/style.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["nuxt-rating", "@nuxtjs/supabase", "@nuxt/icon"],
  supabase: {
    url: process.env.SUPABASE_DATABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    redirectOptions: {
      exclude: ["/", "/signup", "/about", "/course/*", "/search"],
      saveRedirectToCookie: true,
    },
  },
});

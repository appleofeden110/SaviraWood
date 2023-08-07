// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  devServer: {
    port: 5000
  },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
})
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  devServer: {
    port: 5050
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image'
  ]
})
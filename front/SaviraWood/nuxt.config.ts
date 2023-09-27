// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 5050
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-security',    
  ],
  security: {
    headers: {}
  }

})
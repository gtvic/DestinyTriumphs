// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      bungieApiKey: process.env.BUNGIE_API_KEY
    }
  }
})

export default {
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  components: true,

  head: {
    titleTemplate: "Mastering Nuxt: %s",
    htmlAttrs: {
      lang: "en",
    },
    bodyAttrs: {
      class: ["app"],
    },
    meta: [
      {
        charset: "utf-8",
      }
    ]
  },

  modules: [],

  plugins: [
    '~/plugins/maps.client',
    '~/plugins/dataApi',
  ],

  router: {
    prefetchLinks: false,
  },

  env: {
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_API_KEY,
    },
    googlePlacesAPIKey: process.env.GOOGLE_PLACES_API_KEY,
  }
}

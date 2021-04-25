export default {
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    }
  },

  buildModules: [
    '@nuxtjs/tailwindcss'
  ],

  components: true,

  css: [
    '~/assets/sass/app.scss',
  ],

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

  modules: [
    '~/modules/auth',
    '~/modules/algolia',
  ],

  plugins: [
    '~/plugins/maps.client',
    '~/plugins/dataApi',
    '~/plugins/auth.client',
  ],

  publicRuntimeConfig: {
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_API_KEY,
    },
    auth: {
      cookieName: 'idToken',
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
    },
  },

  privateRuntimeConfig: {
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_PRIVATE_API_KEY,
    },
  },

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


export default {
  mode: 'universal',
  generate: {
    routes: [
      '/blog/1',
      '/blog/2'
    ]
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#ff5e3a' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'msapplication-TileColor', content: '#ff5e3a' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: '48x48' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/icons/favicon-16x16.ico',  },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/icons/favicon-32x32.ico',  },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/icons/apple-touch-icon.png',  },
      { rel: 'mask-icon', href: '/img/icons/safari-pinned-tab.svg', color: '#ff5e3a' },
      { rel: "stylesheet", type: "text/css", href: "https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" }

    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js' },
      { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js' }
    ]
  },
  render: {
    bundleRenderer: {
      shouldPrefetch: (file, type) => {
        if (type === 'script') {
          if (/completion/.test(file)) {
            return false
          }
        }
        return true
      }
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/loading.vue',
  /*
  ** Global CSS
  */
  css: ['~/assets/css/custom.css'],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~plugins/vuetify.js',
    { src: '~plugins/vuex-persist', mode: 'client' },
    { src: '~plugins/vue-form-wizard', mode: 'client' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['nuxt-svg'],
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** PWA Module
  ** From Manifest.json
  */
  pwa: {
    manifest: {
      name: "BEVEILIG.NU",
      short_name: "BEVEILIG.NU",
      theme_color: "#ff5e3a",
      background_color: "#ff5e3a",
      display: "standalone",
      orientation: "portrait",
      scope: "/",
      start_url: "/",
      lang: 'nl'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: ['vuetify'],
    extend (config, ctx) {
    }
  }
}

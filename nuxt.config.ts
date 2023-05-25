// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://unpkg.com/vuetify/dist/vuetify.min.css",
        },
      ],
    },
  },
  css: ["vuetify/styles"],
  components: true,
  build: {
    transpile: ["vuetify"],
  },
  buildModules: ["@nuxtjs/axios"],
  modules: [
    // ...
    [
      "@pinia/nuxt",
      { autoImports: ["defineStore", "definePiniaStore", "acceptHMRUpdate"] },
    ],
  ],
  axios: {},
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  imports: {
    dirs: ["./stores"],
  },
});

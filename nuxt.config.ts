// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {
        enabled: true,

        timeline: {
            enabled: true
        }
    },
    css: ['~/assets/css/main.css'],

    vite: {
        plugins: [
            tailwindcss(),
        ],
    },

    router: {
        options: {
            linkActiveClass: "active bg-accent text-primary cursor-default pointer-events-none",
            linkExactActiveClass: "active bg-accent text-primary cursor-default pointer-events-none"
        }
    },
    svgo: {
        defaultImport: 'component',
    },
    modules: ["nuxt-svgo", "@nuxt/ui"],
    nitro: {
        experimental: {
            websocket: true
        }
    },
    ui: {
        fonts: false,
        colorMode: false
    },
    runtimeConfig: {
        baseurl: 'http://localhost:8000/api/auth'
    },

})

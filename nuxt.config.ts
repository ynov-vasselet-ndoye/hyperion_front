// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
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
    modules: ["nuxt-svgo"]
})

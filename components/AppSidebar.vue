<script setup lang="ts">
const NAVLINKS = [
    {
        url: "/",
        label: "Dashboard",
        icon: "dashboard",
    }
    , {
        url: "/processes",
        label: "Processes",
        icon: "process",
    }, {
        url: "/services",
        label: "Services",
        icon: "server",
    }, {
        url: "/file-manager",
        label: "File manager",
        icon: "folder",
    }, {
        url: "/network",
        label: "Network",
        icon: "network",
    }, {
        url: "/shell",
        label: "Shell",
        icon: "terminal",
    }, {
        url: "/settings",
        label: "Settings",
        icon: "cog",
    }
];
const getIcon = (id: string) => defineAsyncComponent(() => import(`@/public/images/icons/${id}.svg`));
</script>

<template>
    <aside
        class="flex flex-col float-left h-screen border-r-[1px] border-r-secondary/30 px-3 pb-3.5 pt-6 min-w-2xs font-bold">
        <div class="brand font-space-mono flex px-6 gap-x-3 mb-8">
            <img src="/images/logo.svg" alt="Hyperion Logo" />
            <div class="brand-name first-letter:text-accent text-2xl uppercase font-bold">
                Hyperion
            </div>
        </div>
        <nav>
            <ul class="flex flex-col gap-2">
                <NuxtLink
                    class="navlink flex items-center gap-2 px-6 py-5 text-[18px] w-full rounded-xl hover:bg-accent/20 transition duration-300 ease-in-out"
                    v-for="(navLink, index) in NAVLINKS" :key="index" :to="navLink.url">
                    <component :is="getIcon(navLink.icon)"
                        class="stroke-secondary navlink-[.active]:stroke-primary fill-none aspect-square h-6 stroke-2" />
                    <span class="relative top-0.5">{{ navLink.label }}</span>
                </NuxtLink>
            </ul>
        </nav>
        <button
            class="flex cursor-pointer transition duration-300 ease-in-out hover:bg-secondary/85 items-center gap-2 bg-secondary mt-auto text-primary text-left px-6 py-5 text-[18px] leading-4 w-full rounded-xl">
            <component :is="getIcon('log-out')"
                class="stroke-primary navlink-[.active]:stroke-primary fill-none aspect-square h-6 stroke-2" />
            <span class="relative top-0.5">Log out</span>
        </button>
    </aside>
</template>

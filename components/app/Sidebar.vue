<script setup lang="ts">
const NAVLINKS = [
    {
        url: "dashboard",
        label: "Dashboard",
        icon: "dashboard",
    }
    , {
        url: "dashboard-processes",
        label: "Processes",
        icon: "process",
    }, {
        url: "dashboard-services",
        label: "Services",
        icon: "server",
    }, {
        url: "dashboard-file-manager",
        label: "File manager",
        icon: "folder",
    }, {
        url: "dashboard-network",
        label: "Network",
        icon: "network",
    }, {
        url: "dashboard-shell",
        label: "Shell",
        icon: "terminal",
    }, {
        url: "dashboard-settings",
        label: "Settings",
        icon: "cog",
    }
];
const getIcon = (id: string) => defineAsyncComponent(() => import(`@/public/images/icons/${id}.svg`));
</script>

<template>
    <aside
        class="bg-primary flex flex-col float-left h-screen border-r-[1px] border-r-secondary/30 px-3 pb-3.5 pt-6 min-w-2xs font-bold">
        <div class="brand font-space-mono flex px-6 gap-x-3 mb-8">
            <img src="/images/logo.svg" alt="Hyperion Logo" />
            <div class="brand-name first-letter:text-accent text-2xl uppercase font-bold">
                Hyperion
            </div>
        </div>
        <nav>
            <ul class="flex flex-col gap-2">
                <NuxtLink class="navlink hover:bg-accent/20" v-for="(navLink, index) in NAVLINKS" :key="index"
                    :to="{ name: navLink.url }">
                    <component :is="getIcon(navLink.icon)"
                        class="stroke-secondary navlink-[.active]:stroke-primary fill-none aspect-square h-6 stroke-2" />
                    <span class="relative top-0.5">{{ navLink.label }}</span>
                </NuxtLink>
            </ul>
        </nav>
        <button class="navlink cursor-pointer hover:bg-secondary/85 bg-secondary mt-auto text-primary">
            <component :is="getIcon('log-out')"
                class="stroke-primary navlink-[.active]:stroke-primary fill-none aspect-square h-6 stroke-2" />
            <span class="relative top-0.5">Log out</span>
        </button>
    </aside>
</template>

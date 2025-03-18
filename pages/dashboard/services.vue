<script setup lang="ts">
import type { Service } from '~/utils/types/Service';

const sortedServices = ref<Service[]>([]);
const search = ref('');

const {
    receivedMessage: services,
    isError
} = useWebSocket("services");

watch([services], ([newServices]: [Service[]]) => {
    sortedServices.value = newServices.sort((serA, serB) => serA.name - serB.name).filter(service => service.name.toLowerCase().includes(search.value.toLowerCase()));

    if (isError) {
        console.error("Error while loading")
    }
})
</script>

<template>
    <AppPane title="Services" class="grow h-full">
        <form class="max-w-md mb-4">
            <label for="default-search" class="mb-2 text-sm font-medium text-secondary sr-only">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-accent" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" v-model="search" id="default-search"
                    class="block w-full p-4 ps-10 text-sm text-secondary border border-secondary rounded-lg placeholder:text-secondary/30"
                    placeholder="Search Mockups, Logos..." required />
            </div>
        </form>

        <ul>
            <AppLoader v-if="!sortedServices.length" class="block absolute top-1/2 left-1/2 -translate-1/2" />
            <li v-for="(service, index) in sortedServices" :key="index">
                <DataService :service="service" :show-actions="true" :class="{ 'bg-primary': index % 2 }" />
            </li>
        </ul>
    </AppPane>
</template>

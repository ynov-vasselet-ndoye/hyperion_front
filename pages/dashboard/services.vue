<script setup lang="ts">
import type { Service } from '~/utils/types/Service';


definePageMeta({
    layout: "dashboard"
})

const sortedServices = ref<Service[]>([]);

const {
    receivedMessage: services,
} = useWebSocket("services");

watch([services], ([newProcesses]: [Service[]]) => {
    setTimeout(() => {
        sortedServices.value = newProcesses.sort((pA, pB) => pA.name > pB.name ? 1 : -1)
    })
})
</script>

<template>
    <AppPane title="Services" class="grow h-full">
        <ul>
            <AppLoader v-if="!sortedServices.length" class="block absolute top-1/2 left-1/2 -translate-1/2" />
            <li v-for="(service, index) in sortedServices" :key="index">
                <DataService :service="service" :show-actions="true" :class="{ 'bg-primary': index % 2 }" />
            </li>
        </ul>
    </AppPane>
</template>

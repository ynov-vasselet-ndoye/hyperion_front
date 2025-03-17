<script setup lang="ts">
import type { Process } from '~/utils/types/Process';


definePageMeta({
    layout: "dashboard"
})

const sortedProcesses = ref<Process[]>([]);

const {
    receivedMessage: processes,
} = useWebSocket("processes");

watch([processes], ([newProcesses]: [Process[]]) => {
    setTimeout(() => {
        sortedProcesses.value = newProcesses.sort((pA, pB) => pA.pid - pB.pid)
    })
})
</script>

<template>
    <AppPane title="Processes" class="grow ">
        <AppLoader v-if="!sortedProcesses.length" class="block absolute top-1/2 left-1/2 -translate-1/2" />
        <ul v-if="processes" class="h-[calc(100%-38px)] rounded-b-xl overflow-scroll">
            <li v-for="(process, index) in sortedProcesses" :key="index">
                <DataProcess :process="process" :show-actions="true" :class="{ 'bg-primary': index % 2 }" />
            </li>
        </ul>
    </AppPane>
</template>

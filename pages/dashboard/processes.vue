<script setup lang="ts">
import type { Process } from '~/utils/types/Process';

const sortedProcesses = ref<Process[]>(null);
const search = ref('');
const toast = useToast()

const {
    receivedMessage: processes,
    ws,
    isError
} = useWebSocket("processes");

watch([processes, isError, search], ([newProcesses]: [Process[], boolean, string]) => {
    sortedProcesses.value = newProcesses.sort((pA, pB) => pA.pid - pB.pid).filter(process => process.name.toLowerCase().includes(search.value.toLowerCase()));

    if (isError) {
        toast.add({ title: "Error", description: "Error on loading" });
    }
})


function closeProcess(pid: number) {
    ws.value?.send(`{"action":"stop","pid":${pid}}`)
}
</script>

<template>
    <AppPane title="Processes" class="grow ">
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

        <AppLoader v-if="sortedProcesses === null" class="block absolute top-1/2 left-1/2 -translate-1/2" />
        <p v-if="sortedProcesses && !sortedProcesses.length">No process found</p>
        <ul v-if="processes" class="h-[calc(100%-38px)] rounded-b-xl overflow-scroll">
            <li v-for="(process, index) in sortedProcesses" :key="index">
                <DataProcess :ws="ws" :process="process" @close-process="closeProcess" :show-actions="true"
                    :class="{ 'bg-primary': index % 2 }" />
            </li>
        </ul>
    </AppPane>
</template>

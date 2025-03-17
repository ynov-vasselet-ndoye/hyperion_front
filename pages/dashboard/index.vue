<script setup lang="ts">
import { DateTime } from "luxon";

const convertToISO8601 = (dateString: string) => {
    // Parse the input date string
    const dt = DateTime.fromISO(dateString, { setZone: true });

    // Convert to standard ISO 8601 format
    return dt.toMillis();
};

definePageMeta({
    layout: "dashboard"
})

const {
    receivedMessage: processes,
} = useWebSocket("processes");

const {
    receivedMessage: services,
} = useWebSocket("services");

const {
    receivedMessage: cpuUsage,
    ws: cpuUsageWs,
} = useWebSocket("cpu");

const cpuUsageFormatedData = computed(() => {
    // if (cpuUsage.value) cpuUsageWs.value?.close();
    return cpuUsage.value?.data.map((data: any) => {
        return { x: DateTime.fromISO(data.recorded_at, { setZone: true }).toMillis(), y: data.usage }
    })
})


const {
    receivedMessage: memoryUsage,
    ws: memoryUsageWs
} = useWebSocket("memory");

const memoryUsageFormatedData = computed(() => {
    // if (memoryUsage.value) memoryUsageWs.value?.close();
    return memoryUsage.value?.data.map((data: any) => {
        return { x: DateTime.fromISO(data.recorded_at, { setZone: true }).toMillis(), y: data.usage }
    })
})
</script>

<template>
    <h1 class="mb-6">Dashboard</h1>
    <div class="grid grid-cols-2 grid-rows-[auto_1fr] w-full grow gap-8">
        <AppPane title="System metrics" class="col-span-2 h-fit">
            <div class="flex gap-6">
                <HomeGraph title="CPU Usage" class="w-full" :graph-data="cpuUsageFormatedData" x-label="time"
                    y-label="usage" />
                <HomeGraph title="Memory Usage" class="w-full" :graph-data="memoryUsageFormatedData" x-label="time"
                    y-label="usage" />
            </div>
        </AppPane>
        <AppPane title="Services" class="grow h-full">
            <ul>
                <li v-for="(service, index) in services" :key="index">
                    <DataService :service="service" :show-actions="false" :class="{ 'bg-primary': index % 2 }" />
                </li>
            </ul>
        </AppPane>
        <AppPane title="Processes" class="grow h-full">
            <AppLoader v-if="!processes" class="block absolute top-1/2 left-1/2 -translate-1/2" />
            <ul v-if="processes">
                <li v-for="(process, index) in processes" :key="index">
                    <DataProcess :process="process" :show-actions="false" :class="{ 'bg-primary': index % 2 }" />
                </li>
            </ul>
        </AppPane>
    </div>
</template>

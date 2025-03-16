<script setup lang="ts">
import type Process from '~/components/data/Process.vue';
import { processes } from '~/utils/fakedata/processes';

definePageMeta({
    layout: "dashboard"
})

</script>

<template>
    <h1 class="mb-6">Dashboard</h1>
    <div class="grid grid-cols-2 grid-rows-[auto_1fr] w-full grow gap-8">
        <AppPane title="System metrics" class="col-span-2 h-fit">
            <div class="flex gap-6">
                <HomeGraph class="w-full" />
                <HomeGraph class="w-full" />
                <HomeGraph class="w-full" />
            </div>
        </AppPane>
        <AppPane title="Services" class="grow h-full">
            <ul>
                <li v-for="(process, index) in processes" :key="index">
                    <DataService :service="process" :show-actions="false" :class="{ 'bg-primary': index % 2 }" />
                </li>
            </ul>
        </AppPane>
        <AppPane title="Processes" class="grow h-full">
            <ul>
                <li v-for="(process, index) in processes" :key="index">
                    <DataProcess :process="process" :show-actions="false" :class="{ 'bg-primary': index % 2 }" />
                </li>
            </ul>
        </AppPane>
    </div>
</template>

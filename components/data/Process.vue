<script setup lang="ts">
import { type Process } from '~/utils/types/Process';

interface ProcessComponentProps {
    process: Process,
    showActions?: boolean
}

const { process, showActions } = withDefaults(defineProps<ProcessComponentProps>(), {
    showActions: false
})
</script>

<template>
    <div class="process flex justify-between items-center px-4 py-2 bg-accent/10 rounded-lg">
        <div class="name-status flex flex-col">
            <div class="flex">
                <span class="name text-lg opacity-40 font-normal mr-2">{{ process.PID }}</span>
                <span class="name font-bold text-lg">{{ process.name }}</span>
            </div>
            <span class="status text-sm font-semibold -mt-0.5 text-success">{{ process.status.toLowerCase() }}</span>
        </div>
        <div class="flex gap-8">
            <div class="cpu-usage font-extrabold"><span class="opacity-40 font-normal mr-2">CPU</span>{{ process.CPU }}%
            </div>
            <div class="mem-usage font-extrabold"><span class="opacity-40 font-normal mr-2">Mem.</span>{{ process.MEM
                }}%
            </div>
            <div class="actions" v-if="showActions">actions</div>
        </div>
    </div>
</template>

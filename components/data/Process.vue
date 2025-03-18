<script setup lang="ts">
import { type Process } from '~/utils/types/Process';

const getIcon = (id: string) => defineAsyncComponent(() => import(`@/public/images/icons/${id}.svg`));
interface ProcessComponentProps {
    process: Process,
    showActions?: boolean
}

defineEmits(['closeProcess'])

const { process, showActions } = defineProps<ProcessComponentProps>()
</script>

<template>
    <div class="process flex justify-between items-center px-4 py-2 bg-accent/10 rounded-lg">
        <div class="name-status flex flex-col">
            <div class="flex">
                <span class="name text-lg opacity-40 font-normal mr-2">{{ process.pid }}</span>
                <span class="name font-bold text-lg">{{ process.name }}</span>
            </div>
            <span class="status text-sm font-semibold -mt-0.5 text-success">{{ process.status.toLowerCase() }}</span>
        </div>
        <div class="flex gap-8">
            <div class="cpu-usage font-extrabold"><span class="opacity-40 font-normal mr-2">CPU</span>{{
                process.cpu_percent.toFixed(2) }}%
            </div>
            <div class="mem-usage font-extrabold"><span class="opacity-40 font-normal mr-2">Mem.</span>{{
                process.memory_percent.toFixed(2)
            }}
            </div>
            <client-only>
                <div class="actions flex gap-2" v-show="showActions">
                    <component key="power-icon" :is="getIcon('power')" @click="$emit('closeProcess', process.pid)"
                        class="stroke-accent fill-none aspect-square h-5 stroke-2 cursor-pointer" />
                </div>
            </client-only>
        </div>
    </div>
</template>

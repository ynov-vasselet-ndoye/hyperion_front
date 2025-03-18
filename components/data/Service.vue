<script setup lang="ts">
import { type Service } from '~/utils/types/Service';

interface ServiceComponentProps {
    service: Service,
    showActions?: boolean
}

const { service, showActions } = withDefaults(defineProps<ServiceComponentProps>(), {
    showActions: false
})

defineEmits(['stopService', 'restartService'])
const getIcon = (id: string) => defineAsyncComponent(() => import(`@/public/images/icons/${id}.svg`));
</script>

<template>
    <div class="service flex justify-between items-center px-4 py-2 bg-accent/10 rounded-lg">
        <div class="name-status flex flex-col">
            <span class="name font-bold text-lg">{{ service.name }}</span>
            <span class="status text-sm font-semibold -mt-0.5 text-success">{{ service.status.toLowerCase() }}</span>
        </div>
        <client-only>
            <div class="actions flex gap-2" v-if="showActions">
                <component key="power-icon" :is="getIcon('power')" @click="$emit('stopService', service.name)"
                    class="stroke-accent fill-none aspect-square h-5 stroke-2 cursor-pointer" />
                <!-- <component key="stop-icon" :is="getIcon('stop')" -->
                <!--     class="stroke-accent fill-none aspect-square h-5 stroke-2" /> -->
                <component key="restart-1-icon" :is="getIcon('restart-1')"
                    class="stroke-accent fill-none aspect-square h-5 stroke-2 cursor-pointer"
                    @click="$emit('restartService', service.name)" />
            </div>
        </client-only>
    </div>
</template>

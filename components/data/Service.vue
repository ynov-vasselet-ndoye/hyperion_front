<script setup lang="ts">
import { type Service } from '~/utils/types/Service';

interface ServiceComponentProps {
    service: Service,
    showActions?: boolean
}

const { service, showActions } = withDefaults(defineProps<ServiceComponentProps>(), {
    showActions: false
})
</script>

<template>
    <div class="service flex justify-between items-center px-4 py-2 bg-accent/10 rounded-lg">
        <div class="name-status flex flex-col">
            <span class="name font-bold text-lg">{{ service.name }}</span>
            <span class="status text-sm font-semibold -mt-0.5 text-success">{{ service.status.toLowerCase() }}</span>
        </div>
        <div class="actions" v-if="showActions">actions</div>
    </div>
</template>

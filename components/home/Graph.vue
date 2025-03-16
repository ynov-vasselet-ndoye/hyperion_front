<script setup lang="ts">
const { title } = defineProps({ title: { type: String, default: "title" } })
import { VisXYContainer, VisLine, VisAxis, VisArea } from '@unovis/vue'
import { ref } from 'vue'

type DataRecord = { x: number, y: number }
const data = ref<DataRecord[]>([
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
])
</script>

<template>
    <div class="graph">
        <h3 class="mb-4 tracking-tighter">{{ title }}</h3>
        <VisXYContainer>
            <VisLine color='var(--color-accent)' :data="data" :x="(d: DataRecord) => d.x" :y="(d: DataRecord) => d.y" />
            <VisArea color='var(--color-accent)' :data="data" :x="(d: DataRecord) => d.x" :y="(d: DataRecord) => d.y"
                :opacity="0.1" />
            <VisAxis type="x" />
            <VisAxis type="y" />
        </VisXYContainer>
    </div>
</template>

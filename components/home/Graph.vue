<script setup lang="ts">
import { DateTime } from "luxon";
import { Bar } from 'vue-chartjs'

type GraphDataRecord = {
    [key: string]: any
}

type HomeGraphProps = {
    title?: string,
    graphData?: GraphDataRecord
    xAxis?: string,
    yAxis?: string,
    yLabel?: string,
    xLabel?: string,
}

const { title, graphData, xAxis, yAxis, xLabel, yLabel } = defineProps<HomeGraphProps>()
import { Scale } from '@unovis/ts';
import { VisXYContainer, VisLine, VisAxis, VisArea, VisTooltip, VisCrosshair } from '@unovis/vue'
import { ref } from 'vue'

type DataRecord = { x: number, y: number }
const data = ref<DataRecord[]>([
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 3, y: 0 },
    { x: 4, y: 2 },
    { x: 5, y: 1 },
])
const tooltipTemplate = (d: any) => {
    console.log("Tooltip Data:", d); // Debugging
    return `Time: ${formatDate(d.x)}<br> Usage: ${d.y}%`;
};
const xScale = Scale.scaleTime()

const formatDate = (timestamp: object) => {
    return DateTime.fromObject(timestamp).toFormat("HH:mm:ss");
};
</script>

<template>
    <div class="graph">
        <h3 class="mb-4 tracking-tighter">{{ title }}</h3>
        <VisXYContainer :data="graphData ?? data" :xScale="xScale">
            <VisArea :x="(d: any) => d.x" :y="(d: any) => d.y" fill="var(--color-accent-light)" opacity="0.3" />
            <VisLine color='var(--color-accent)' :x="(d: any) => d[xAxis ?? 'x']" :y="(d: any) => d[yAxis ?? 'y']"
                :numTicks="4" />
            <VisAxis type="x" :label="xLabel" :tickFormat="formatDate" />
            <VisAxis type="y" :label="yLabel" />
            <VisTooltip />
            <VisCrosshair :template="tooltipTemplate" />
        </VisXYContainer>
    </div>
</template>

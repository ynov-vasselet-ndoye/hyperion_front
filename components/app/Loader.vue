<script setup>
import { HollowDotsSpinner } from 'epic-spinners'
</script>

<template>
    <ClientOnly>
        <hollow-dots-spinner :animation-duration="1000" :dot-size="15" :dots-num="3" color="var(--color-accent)" />
    </ClientOnly>

</template>

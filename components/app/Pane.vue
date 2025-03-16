<script setup lang="ts">
const { title } = defineProps({
    title: String,
})
</script>

<template>
    <div class="pane p-6 shadow-(--pane-shadow) rounded-3xl bg-primary">
        <h2 class="font-fustat font-black text-3xl mb-4 tracking-tighter">{{ title }}</h2>
        <slot />
    </div>
</template>

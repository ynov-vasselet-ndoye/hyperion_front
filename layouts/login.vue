<template>
    <main class="w-full px-10 py-6 z-10 relative h-screen overflow-y-auto">
        <slot />
    </main>
    <div
        class="sphere bg-accent/10 h-[100vw] w-[500vw] block fixed top-[60vh] left-[30vw] rounded-full blur-[128px] z-[-1]">
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: [],
    layout: "login"
})
const credentials = reactive({
    username: '',
    password: '',
})
const toast = useToast()

const { login } = useAuth();

async function handleLogin(e: Event) {
    e.preventDefault();

    try {
        const res: {
            status: string,
            token: string,
            user_id: number,
            username: string
        } = await $fetch('http://localhost:8000/api/auth/api-login/', {
            method: 'POST',
            body: { username: credentials.username, password: credentials.password }
        });
        login(res.token); // Set token in cookie
    } catch (error) {
        toast.add({ title: "Error", description: "Error on login" });
    }
}
</script>

<template>
    <form class="flex flex-col items-center content-center justify-center h-full"
        @submit="(e: Event) => handleLogin(e)">
        <img src="/images/logo.svg" class="mb-8 w-24" />
        <input type="text" placeholder="username" v-model="credentials.username" required
            class="w-80 font-space-mono font-medium outline-2 outline-secondary rounded-sm background-primary py-2 px-3 placeholder:uppercase placeholder:font-space-mono placeholder:font-bold mb-4">
        <input type="password" placeholder="password" v-model="credentials.password" required
            class="w-80 font-space-mono outline-2 outline-secondary rounded-sm background-primary py-2 px-3 placeholder:uppercase placeholder:font-bold">
        <button
            class="mt-6 text-primary bg-accent px-5 py-3 rounded-sm cursor-pointer hover:bg-accent/70 transition-all ease-out">
            Log in
        </button>
    </form>
</template>

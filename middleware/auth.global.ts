export default defineNuxtRouteMiddleware((to) => {
    const { isLoggedIn } = useAuth();

    // Redirect to login if not authenticated
    if (!isLoggedIn.value && to.path !== '/login') {
        return navigateTo('/login');
    }

    // Redirect to home if already logged in and trying to access login page
    if (isLoggedIn.value && to.path === '/login') {
        return navigateTo('/dashboard');
    }
});

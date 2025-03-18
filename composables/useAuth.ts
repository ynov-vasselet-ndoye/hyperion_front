export const useAuth = () => {
    // Use cookies for token and expiration
    const authToken = useCookie('authToken');
    const authExpiresAt = useCookie('authExpiresAt');

    // Check if the user is logged in
    const isLoggedIn = computed(() => {
        if (!authToken.value || !authExpiresAt.value) return false;
        return Date.now() < parseInt(authExpiresAt.value);
    });

    // Set token and expiration
    const login = (newToken: string) => {
        const expiration = Date.now() + 3600 * 1000; // 1 hour
        authToken.value = newToken;
        authExpiresAt.value = expiration.toString();
        navigateTo("/dashboard")
    };

    // Clear token and expiration
    const logout = () => {
        authToken.value = null;
        authExpiresAt.value = null;
        navigateTo("/login")
    };

    return { authToken, isLoggedIn, login, logout };
};

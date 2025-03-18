import { useQuery } from '@tanstack/vue-query';

export const useAuthQuery = (queryKey: any[], endpoint: string) => {
    const { authToken, isLoggedIn } = useAuth();

    return useQuery({
        queryKey,
        queryFn: async () => {
            if (!isLoggedIn.value) throw new Error('Not authenticated');

            return $fetch(`http://localhost:8000/api${endpoint}`, {
                headers: { Authorization: `Token ${authToken.value}` }
            });
        },
        enabled: isLoggedIn.value
    });
};

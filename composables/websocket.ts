export const useWebSocket = (url: string) => {
    const toast = useToast()

    const receivedMessage = ref<any>(null);
    const ws = ref<WebSocket | null>(null);
    const isConnected = ref(false);
    const isError = ref(false);
    const retryInterval = 3000;
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;

    // Retry connection mechanism
    const attemptReconnect = () => {
        if (!isConnected.value && !retryTimeout) {
            retryTimeout = setTimeout(() => {
                isError.value = false;
                console.log("Attempting to reconnect...");
                connectWebSocket();
            }, retryInterval);
        }
    };

    const connectWebSocket = () => {
        if (ws.value) {
            ws.value.close();
        }

        ws.value = new WebSocket(`ws://localhost:8000/ws/${url}/`);

        ws.value.onopen = () => {
            console.log("WebSocket connected.");
            isConnected.value = true;
            if (retryTimeout) {
                clearTimeout(retryTimeout);
                retryTimeout = null;
            }
        };

        ws.value.onmessage = async ({ data }) => {
            receivedMessage.value = JSON.parse(data);
        };

        ws.value.onerror = (error) => {
            console.error("WebSocket error:", error);
            isConnected.value = false;
            isError.value = true;
            toast.add({
                title: 'Error',
                description: 'Error when retrieving data. Retrying...',
                color: 'warning'
            })
        };

        ws.value.onclose = () => {
            console.log("WebSocket closed. Retrying...");
            isConnected.value = false;
            attemptReconnect();
        };
    };

    const sendMessage = (message: string) => {
        if (ws.value && isConnected.value) {
            ws.value.send(message);
        } else {
            console.warn("WebSocket not connected. Message not sent.");
        }
    };

    onMounted(() => {
        connectWebSocket();
    });

    onUnmounted(() => {
        if (ws.value) {
            ws.value.close();
        }
        if (retryTimeout) {
            clearTimeout(retryTimeout);
        }
    });

    return {
        receivedMessage,
        isConnected,
        sendMessage,
        reconnect: connectWebSocket,
        isError,
        ws
    };
};

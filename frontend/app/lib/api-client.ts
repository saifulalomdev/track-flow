import axios from 'axios';

export const apiClient = axios.create({
    baseURL: "http://localhost:8787",
});

apiClient.interceptors.request.use(async (config) => {
    try {
        // Access Clerk safely from the window object
        const clerk = (window as any).Clerk;

        // Check if Clerk is initialized and a session exists
        if (clerk?.session) {
            const token = await clerk.session.getToken();
            
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
    } catch (error) {
        // If getting the token fails, we still want the request to try to go through
        // or you can handle logout logic here.
        console.error("Clerk interceptor error:", error);
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});
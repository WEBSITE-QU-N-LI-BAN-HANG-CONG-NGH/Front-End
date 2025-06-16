import axios from "axios";
import { authService } from "../services/auth.service";
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from "../services/util";

// Ensure the backend URL has proper protocol
const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Clean and validate the backend URL
const cleanBackendUrl = (url) => {
    if (!url) return "http://localhost:8080";
    
    // Remove trailing slash if exists
    url = url.replace(/\/$/, '');
    
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
    }
    
    return url;
};

const cleanedBackendUrl = cleanBackendUrl(BACKEND_URL);
export const API_BASE_URL = `${cleanedBackendUrl}/api/v1`;

console.log('Backend URL:', cleanedBackendUrl);
console.log('API Base URL:', API_BASE_URL);

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

// Variables to track pending requests during token refresh
let isRefreshing = false;
let failedQueue = [];

// Process queued requests after token refresh
const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = getTokenFromLocalStorage();
        if (token) {
            console.log(`Sending request to: ${config.url}`);
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Ensure the final URL is valid
        try {
            const fullUrl = config.baseURL + config.url;
            new URL(fullUrl); // This will throw if URL is invalid
            console.log('Valid URL constructed:', fullUrl);
        } catch (urlError) {
            console.error('Invalid URL construction:', {
                baseURL: config.baseURL,
                url: config.url,
                error: urlError.message
            });
            return Promise.reject(new Error(`Invalid URL: ${config.baseURL}${config.url}`));
        }
        
        return config;
    },
    (error) => {
        console.error("Error preparing request:", error);
        return Promise.reject(error);
    }
);

// Response interceptor with token refresh logic
api.interceptors.response.use(
    (response) => {
        console.log("Successful response:", response.status, response.config.url);
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Enhanced error logging
        if (error.response) {
            console.error("API Error Response:", {
                status: error.response.status,
                statusText: error.response.statusText,
                url: error.config?.url,
                data: error.response.data
            });
        } else if (error.request) {
            console.error("API Network Error:", {
                message: error.message,
                url: error.config?.url,
                code: error.code
            });
        } else {
            console.error("API Setup Error:", error.message);
        }

        // Handle 401 Unauthorized with token refresh
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            console.log("Received 401 error, attempting token refresh...");

            if (isRefreshing) {
                console.log("Token refresh in progress, queueing request");
                try {
                    const token = await new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    });
                    console.log("Got new token from queue, retrying request");
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return api(originalRequest); // Use api instance instead of axios
                } catch (err) {
                    console.error("Error processing queued request:", err);
                    return Promise.reject(err);
                }
            }

            originalRequest._retry = true;
            isRefreshing = true;
            console.log("Starting token refresh process");

            try {
                // Attempt to refresh token
                const newToken = await authService.refreshToken();
                console.log("Token refresh successful");

                // Update token for current request and queued requests
                processQueue(null, newToken);
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                return api(originalRequest); // Use api instance instead of axios
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                processQueue(refreshError, null);

                console.log("Clearing tokens and redirecting to login");
                removeTokenFromLocalStorage();
                
                // Redirect to login page
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // Handle network errors
        if (!error.response && error.request) {
            console.error("Network error - server may be unreachable");
            // You might want to show a user-friendly message here
        }

        return Promise.reject(error);
    }
);

// Export a helper function to check API health
export const checkApiHealth = async () => {
    try {
        const response = await api.get('/health', { timeout: 5000 });
        console.log('API health check passed');
        return true;
    } catch (error) {
        console.error('API health check failed:', error.message);
        return false;
    }
};
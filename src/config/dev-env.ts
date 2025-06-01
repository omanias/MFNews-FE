export const getDevEnv = () => {
    if (process.env.NODE_ENV === 'test') {
        return null;
    }

    try {
        if (typeof import.meta !== 'undefined' && import.meta.env) {
            return {
                VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
                VITE_AUTH_TOKEN_KEY: import.meta.env.VITE_AUTH_TOKEN_KEY,
                VITE_USER_KEY: import.meta.env.VITE_USER_KEY,
                VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
                VITE_APP_VERSION: import.meta.env.VITE_APP_VERSION,
                VITE_ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS,
                VITE_ENABLE_LOGGING: import.meta.env.VITE_ENABLE_LOGGING
            };
        }
    } catch (error) {
        return null;
    }
    return null;
}; 
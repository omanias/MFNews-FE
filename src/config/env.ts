interface EnvConfig {
    VITE_API_BASE_URL: string;
    VITE_AUTH_TOKEN_KEY: string;
    VITE_USER_KEY: string;
    VITE_APP_ENV: string;
    VITE_APP_VERSION: string;
    VITE_ENABLE_ANALYTICS: string;
    VITE_ENABLE_LOGGING: string;
}

const defaultConfig: EnvConfig = {
    VITE_API_BASE_URL: 'http://localhost:3000/api',
    VITE_AUTH_TOKEN_KEY: 'token',
    VITE_USER_KEY: 'user',
    VITE_APP_ENV: 'development',
    VITE_APP_VERSION: '0.0.0',
    VITE_ENABLE_ANALYTICS: 'false',
    VITE_ENABLE_LOGGING: 'true'
};

const getEnvConfig = (): EnvConfig => {
    if (typeof window !== 'undefined' && (window as any).__vite_env__) {
        return (window as any).__vite_env__;
    }

    if (typeof process !== 'undefined' && process.env) {
        return {
            ...defaultConfig,
            ...process.env
        } as EnvConfig;
    }

    return defaultConfig;
};

if (typeof window !== 'undefined') {
    (window as any).__vite_env__ = defaultConfig;
}

export const env = getEnvConfig(); 
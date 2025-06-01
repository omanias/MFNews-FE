import { testEnv } from './test-env';
import { getDevEnv } from './dev-env';

// Mock environment for tests
const mockEnv = {
    VITE_API_BASE_URL: 'http://localhost:3000/api',
    VITE_AUTH_TOKEN_KEY: 'token',
    VITE_USER_KEY: 'user',
    VITE_APP_ENV: 'test',
    VITE_APP_VERSION: '0.0.0',
    VITE_ENABLE_ANALYTICS: 'false',
    VITE_ENABLE_LOGGING: 'true'
};

// This file is only used in development with Vite
const getViteEnv = () => {
    // For tests and SSR
    if (process.env.NODE_ENV === 'test' || typeof window === 'undefined') {
        return testEnv;
    }

    // For development
    const env = (window as any).__vite_env__ || {};
    const devEnv = getDevEnv();

    // Use test environment as fallback
    return {
        VITE_API_BASE_URL: env.VITE_API_BASE_URL || (devEnv?.VITE_API_BASE_URL ?? testEnv.VITE_API_BASE_URL),
        VITE_AUTH_TOKEN_KEY: env.VITE_AUTH_TOKEN_KEY || (devEnv?.VITE_AUTH_TOKEN_KEY ?? testEnv.VITE_AUTH_TOKEN_KEY),
        VITE_USER_KEY: env.VITE_USER_KEY || (devEnv?.VITE_USER_KEY ?? testEnv.VITE_USER_KEY),
        VITE_APP_ENV: env.VITE_APP_ENV || (devEnv?.VITE_APP_ENV ?? testEnv.VITE_APP_ENV),
        VITE_APP_VERSION: env.VITE_APP_VERSION || (devEnv?.VITE_APP_VERSION ?? testEnv.VITE_APP_VERSION),
        VITE_ENABLE_ANALYTICS: env.VITE_ENABLE_ANALYTICS || (devEnv?.VITE_ENABLE_ANALYTICS ?? testEnv.VITE_ENABLE_ANALYTICS),
        VITE_ENABLE_LOGGING: env.VITE_ENABLE_LOGGING || (devEnv?.VITE_ENABLE_LOGGING ?? testEnv.VITE_ENABLE_LOGGING)
    };
};

// Only set window.__vite_env__ in browser environment and not in test environment
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
    const devEnv = getDevEnv();
    if (devEnv) {
        (window as any).__vite_env__ = devEnv;
    }
}

export const viteEnv = getViteEnv(); 
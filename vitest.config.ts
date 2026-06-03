import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
    test: {
        environment: 'jsdom',
        include: ["**/__tests__/**"],
        globals: true,
        server: {
            deps: {
                inline: ['drizzle-orm'],
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        }
    }
});

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ["**/__tests__/**"],
        server: {
            deps: {
                inline: ['drizzle-orm'],
            },
        },
    },
    resolve: {
        alias: {
            '@': './src',
        }
    }
});

import { defineConfig } from 'vitest/config';
import path from 'path'; // 1. Import Node's path utility

export default defineConfig({
    test: {
        include: ["**/__test__/**"]
    },
    resolve: {
        alias: {
            '@': './src',
        }
    }
});

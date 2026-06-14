import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflareTest } from "@cloudflare/vitest-pool-workers";

export default defineConfig({
    test: {
        projects: [
            {
                // 1. BACKEND ISOLATED WORKERS RUNNER
                plugins: [
                    tsconfigPaths(),
                    cloudflareTest({ wrangler: { configPath: "./wrangler.jsonc" } }),
                ],
                test: {
                    name: "server-workers",
                    globals: true,
                    include: ["**/__tests__/**/*.ts"],
                },
            },
            {
                // 2. CLIENT UI RUNNER (unchanged)
                plugins: [tsconfigPaths()],
                test: {
                    name: "client-ui",
                    globals: true,
                    include: ["**/__tests__/**/*.tsx"],
                    environment: "jsdom",
                },
            },
        ],
    },
});
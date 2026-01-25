// packages/config/src/server.ts
// import "server-only"; // Throws a build-time error if imported on client
import z from 'zod';

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(1),
    JWT_SECRET_EXIRES_IN: z.string().optional().default("7d"),
});

// Validate process.env
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error("❌ Invalid Environment Variables:", JSON.stringify(_env.error.format(), null, 2));
    // In Next.js, we don't always want to process.exit(1) during build 
    // but for a config file like this, throwing an error is appropriate.
    throw new Error("Invalid environment variables");
}

export const ENV = _env.data;
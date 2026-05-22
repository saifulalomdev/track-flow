// src/lib/get-db.ts
import * as schema from "@/db/schema/index";
import { drizzle } from 'drizzle-orm/d1';

export const getDb = (env: Env | undefined) => {
    // Prevent silent failure by checking if Cloudflare's binding exists
    if (!env || !env.DB) {
        throw new Error("DATABASE_BINDING_MISSING: Ensure wrangler.jsonc contains the DB binding and env is passed correctly.");
    }
    
    return drizzle(env.DB, { schema });
};

// This correctly extracts the exact Drizzle client instance type automatically!
export type D1Instance = ReturnType<typeof getDb>;

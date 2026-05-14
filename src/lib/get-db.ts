// src/lib/get-db.ts
import * as schema from "@/db/schema/index";
import { drizzle } from 'drizzle-orm/d1';

export const getDb = (env: Env) => {
    if (!env) return drizzle({} as any, { schema });
    return drizzle(env.DB, { schema });
};

// CORRECT TYPE EXTRACTION: Pass the function itself to ReturnType
export type D1Instance = ReturnType<typeof getDb>;
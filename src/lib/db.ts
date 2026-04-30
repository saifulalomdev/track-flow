// src/lib/db.ts
import * as schema from "@/db/schema";
import { drizzle } from 'drizzle-orm/d1';

export const getDb = (d1?: D1Database) => {
    // If d1 is missing (CLI mode), return a proxy or null 
    // Better Auth CLI only needs the adapter structure, not a live connection
    if (!d1) return drizzle({} as any, { schema });
    
    return drizzle(d1, { schema });
};

// src/db/client.ts
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema'; // Assume your schema is in schema.ts

export const getDb = (d1: D1Database) => {
  return drizzle(d1, { schema });
};

// Also export the type for use in controllers
export type DbClient = ReturnType<typeof getDb>;
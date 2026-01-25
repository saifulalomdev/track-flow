import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema/index';
import { ENV } from '@/config/env';

const pool = new Pool({
    connectionString: ENV.DATABASE_URL
})

export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema })




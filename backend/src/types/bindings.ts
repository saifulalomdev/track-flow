import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from '../db/schema';

export  type Bindings = {
    DB: D1Database;
    EVENTS_QUEUE: Queue;
    USER_LIMITS: KVNamespace;
    CLERK_WEBHOOK_SIGNING_SECRET: string;
};

export type Variables = {
  db: DrizzleD1Database<typeof schema>;
};
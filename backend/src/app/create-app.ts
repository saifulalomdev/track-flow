import { OpenAPIHono } from "@hono/zod-openapi";
import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from '../db/schema/index';
import { registerMiddlewares } from "./register-middlewares";

type Bindings = {
    DB: D1Database;
    EVENTS_QUEUE: Queue;
    USER_LIMITS: KVNamespace;
};

export type Variables = {
  // Use the actual Drizzle type so you get autocomplete
  db: DrizzleD1Database<typeof schema>;
};

export function createApp() {
    const app = new OpenAPIHono<{ Bindings: Bindings ,Variables: Variables }>();
    registerMiddlewares(app)
    return app
}


export type AppInstance = ReturnType<typeof createApp>;
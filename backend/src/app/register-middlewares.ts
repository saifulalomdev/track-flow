import { cors } from "hono/cors";
import { AppInstance } from "./create-app";
import { drizzle } from "drizzle-orm/d1";
import { clerkMiddleware } from "@hono/clerk-auth";
import * as schema from '../db/schema/index';

export function registerMiddlewares(app: AppInstance) {
    app.use('*', clerkMiddleware());
    app.use(cors({ origin: "*" }));
    app.use('*', async (c, next) => {
        const db = drizzle(c.env.DB, { schema });
        c.set('db', db);
        await next();
    });
}
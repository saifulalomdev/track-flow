import { OpenAPIHono } from "@hono/zod-openapi";
import { Bindings, Variables } from "@/types/bindings";

export function createApp() {
    const app = new OpenAPIHono<{ Bindings: Bindings ,Variables: Variables }>();
    return app
}

export type AppInstance = ReturnType<typeof createApp>;
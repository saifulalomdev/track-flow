import { createRoute } from "@hono/zod-openapi";
import { clerkSchema } from "./clerk.schema";


export const clerkRoute = createRoute({
    tags: ["Webhooks"],
    path: "/",
    method: "post",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: clerkSchema
                }
            }
        }
    },
    responses: {
        200: {
            description: "User data received"
        }
    }
})
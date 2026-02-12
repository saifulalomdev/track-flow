import { createRoute, z } from "@hono/zod-openapi";
import { collectBatchSchema } from "./event.schema";


export const collectRoute = createRoute({
    tags: ["collect"],
    method: "post",
    path: "/collect",
    request: {
        body: {
            description: "Batch of tracking events from the client",
            content: {
                "application/json": {
                    schema: collectBatchSchema
                }
            }
        }
    },
    responses: {
        202: {
            description: "Events accepted and queued for processing",
            content: {
                "application/json": {
                    schema: z.object({
                        success: z.boolean().openapi({ example: true }),
                        message: z.string().openapi({ example: "Events processed" })
                    })
                }
            }
        },
        400: {
            description: "Invalid payload structure"
        }
    }
});
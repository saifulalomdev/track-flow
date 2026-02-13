import { createRoute, z } from "@hono/zod-openapi";
import { websiteReqSchema, websiteSchema } from "./website.schema";

export const createWebsite = createRoute({
  tags: ["Websites"],
  method: "post",
  path: "/",
  request: {
    body: {
      content: {
        "application/json": {
          schema: websiteReqSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Website created successfully.",
      content: {
        "application/json": {
          schema: z.object({
            success: z.boolean().openapi({ example: true }),
            data: websiteSchema,
          }),
        },
      },
    },
    400: {
      description: "Invalid input data",
    },
  },
});
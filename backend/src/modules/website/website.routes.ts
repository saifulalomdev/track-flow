import { createRoute, z } from "@hono/zod-openapi";
import { websiteReqSchema, websiteSchema } from "./website.schema";

const successResponse = (dataSchema: any, description: string) => ({
  description,
  content: {
    "application/json": {
      schema: z.object({
        success: z.boolean().openapi({ example: true }),
        data: dataSchema,
      }),
    },
  },
});

// 1. GET ALL
export const getWebsites = createRoute({
  tags: ["Websites"],
  method: "get",
  path: "/",
  responses: {
    200: successResponse(z.array(websiteSchema), "List of websites retrieved."),
  },
});

// 2. GET BY ID
export const getWebsiteById = createRoute({
  tags: ["Websites"],
  method: "get",
  path: "/{id}",
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: successResponse(websiteSchema, "Website found."),
    404: { description: "Website not found" },
  },
});

// 3. CREATE (Existing)
export const createWebsite = createRoute({
  tags: ["Websites"],
  method: "post",
  path: "/",
  request: {
    body: { content: { "application/json": { schema: websiteReqSchema } } },
  },
  responses: {
    201: successResponse(websiteSchema, "Website created successfully."),
    400: { description: "Invalid input data" },
  },
});

// 4. UPDATE (Using PATCH for partial updates)
export const updateWebsite = createRoute({
  tags: ["Websites"],
  method: "patch",
  path: "/{id}",
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: {
        "application/json": {
          schema: websiteReqSchema.partial(), // .partial() makes all fields optional
        },
      },
    },
  },
  responses: {
    200: successResponse(websiteSchema, "Website updated successfully."),
    404: { description: "Website not found" },
  },
});

// 5. DELETE (Existing)
export const deleteWebsite = createRoute({
  tags: ["Websites"],
  method: "delete",
  path: "/{id}",
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: successResponse(websiteSchema, "Website deleted successfully."),
    404: { description: "Website not found" },
  },
});
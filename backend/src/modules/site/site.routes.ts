import { createRoute, z } from "@hono/zod-openapi";
import { siteReqSchema, siteSchema, siteUpdateSchema } from "./site.schema";

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

const requestBody = (schema: z.ZodObject) => {
  return { content: { "application/json": { schema } } }
}

// 1. GET ALL
export const getSites = createRoute({
  tags: ["sites"],
  method: "get",
  path: "/",
  security: [{ bearerAuth: [] }],
  responses: {
    200: successResponse(z.array(siteSchema), "List of websites retrieved."),
  },
});

// 2. GET BY ID
export const getSiteById = createRoute({
  tags: ["sites"],
  method: "get",
  path: "/{id}",
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: successResponse(siteSchema, "Website found."),
    404: { description: "Website not found" },
  },
});

// 3. CREATE (Existing)
export const createSite = createRoute({
  tags: ["sites"],
  method: "post",
  path: "/",
  security: [{ bearerAuth: [] }],
  request: {
    body: requestBody(siteReqSchema),
  },
  responses: {
    201: successResponse(siteSchema, "Website created successfully."),
    400: { description: "Invalid input data" },
  },
});

// 4. UPDATE (Using PATCH for partial updates)
export const updateSite = createRoute({
  tags: ["sites"],
  method: "patch",
  path: "/{id}",
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
    body: requestBody(siteUpdateSchema)
  },
  responses: {
    200: successResponse(siteSchema, "Website updated successfully."),
    404: { description: "Website not found" },
  },
});

// 5. DELETE (Existing)
export const deleteSite = createRoute({
  tags: ["sites"],
  method: "delete",
  path: "/{id}",
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: successResponse(siteSchema, "Website deleted successfully."),
    404: { description: "Website not found" },
  },
});
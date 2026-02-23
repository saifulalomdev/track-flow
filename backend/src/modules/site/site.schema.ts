import { site } from "@/db/schema/site";
import { createInsertSchema } from "drizzle-zod";
import { z } from '@hono/zod-openapi';

export const siteSchema = createInsertSchema(site, {
    url: z.url(),
    isActive: z.boolean().default(true),
    userId: z.string(),
})

export const siteReqSchema = createInsertSchema(site, {
    url: z.string().url(),
    isActive: z.boolean().default(true).optional(),
    title: z.string().min(1, "Title is required"), 
}).omit({ id: true, userId: true }).openapi("website");

export const siteUpdateSchema = siteReqSchema.partial()
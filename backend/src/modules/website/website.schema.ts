import { website } from "@/db/schema/website";
import { createInsertSchema } from "drizzle-zod";
import { z } from '@hono/zod-openapi';

export const websiteSchema = createInsertSchema(website, {
    url: z.url(),
    isActive: z.boolean().default(true),
    userId: z.string(),
})

export const websiteReqSchema = createInsertSchema(website, {
    url: z.url(),
    isActive: z.boolean().default(true),
    userId: z.string(),
}).omit({id: true}).openapi("Website")
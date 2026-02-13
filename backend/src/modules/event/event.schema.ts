import { event } from "@/db/schema/event";
import { createInsertSchema } from "drizzle-zod";
import { z } from '@hono/zod-openapi';

export const eventSchema = createInsertSchema(event, {
    id: (s) => s.optional(),
    country: (s) => s.optional(),
    city: (s) => s.optional(),
    utmSource: (s) => s.optional(),
    utmCampaign: (s) => s.optional(),
    utmMedium: (s) => s.optional(),
    screenWidth: (s) => s.optional(),
    language: (s) => s.optional(),
    timestamp: z.coerce.date().optional()
}).omit({ id: true });

export const collectBatchSchema = z.object({
    customerId: z.string().openapi({ example: "cust_987" }),
    events: z.array(eventSchema)
}).openapi("CollectBatch");
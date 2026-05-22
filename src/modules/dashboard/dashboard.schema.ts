// src/modules/dashboard/dashboard.schema.ts
import { z } from "astro:schema";

export const getOverviewSchema = z.object({
  websiteId: z.string().optional(),
  range: z.object({
    from: z.string(),
    to: z.string(),
  }).optional(),
}).optional();

// Export the TypeScript Type automatically from the validation schema
export type GetOverviewInput = z.infer<typeof getOverviewSchema>;

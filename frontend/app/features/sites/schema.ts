import { z } from "zod";

export const siteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Must be a valid URL"),
});

// Extract the type from the schema
export type SiteFormData = z.infer<typeof siteSchema>;
import { z } from 'zod';

export const websiteSchema = z.object({
    url: z.url(),
    title: z.string().min(4, "Title must be at least 4 letter"),
    isActive: z.boolean().default(true).optional(),
})
import type { z } from 'zod';
import { sqliteTable , text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'

export const subscribers = sqliteTable("subscribers", {
    email: text("email").notNull().unique().primaryKey(),
    createdAt: text("created_at").$defaultFn(() => new Date().toISOString())
});

export const subscriberSchema = createInsertSchema(subscribers, {
    email: (s) => s.email("Please provide a valid email address.")
}).omit({ createdAt: true });

export type Subscriber = z.infer<typeof subscriberSchema>;
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { user } from './user';
import { sql } from 'drizzle-orm';

export const site = sqliteTable("site", {
    id: text("id").notNull().primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    title: text("title"),
    url: text("url"),
    isActive: integer("is_active", { mode: 'boolean' }).default(true),
    createdAt: integer("created_at", { mode: "timestamp" })
        .default(sql`(strftime('%s', 'now'))`)
       .notNull(),
})
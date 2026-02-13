import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable("user", {
    id: text("id").notNull().unique().primaryKey(),
    email: text("email").notNull().unique(),
})
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const session = sqliteTable("session", {
    id: text("id").notNull().$defaultFn(()=> crypto.randomUUID()).primaryKey(),              // session id (random)
    userId: text("user_id").notNull(),        // reference to user
    expiresAt: integer("expires_at").notNull(), // timestamp
});
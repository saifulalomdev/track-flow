import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 20;

export const user = sqliteTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    createdAt: text("created_at")
        .notNull()
        .$defaultFn(() => new Date().toISOString()),
    updatedAt: text("updated_at")
        .notNull()
        .$defaultFn(() => new Date().toISOString())
        .$onUpdateFn(() => new Date().toISOString()),
});

export const userSchema = createInsertSchema(user, {
    // Adding email validation and name length constraints
    // @ts-ignore
    email: (schema) => schema.email("Invalid email address"),
    name: (schema) => schema
    // @ts-ignore
        .min(NAME_MIN_LENGTH, `Name must be at least ${NAME_MIN_LENGTH} characters`)
        .max(NAME_MAX_LENGTH, `Name cannot exceed ${NAME_MAX_LENGTH} characters`),
}).omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

export const signInSchema = userSchema.omit({name: true})
export type SignIn = z.infer<typeof signInSchema>

export type User = z.infer<typeof userSchema>
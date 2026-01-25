// src/db/schema/users.ts
import { pgTable, uuid, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 50;
const PASSWORD_MIN_LENGTH = 6;

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 256 }).notNull(),
    isVerified: boolean("is_verified").default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date())
});

// validation rules
export const insertUserSchema = createInsertSchema(users, {
    name: (schema) => schema
        .min(NAME_MIN_LENGTH, `Name must be at least ${NAME_MIN_LENGTH} characters`)
        .max(NAME_MAX_LENGTH, `Name must be within ${NAME_MAX_LENGTH} characters`),
    email: (schema) => schema.email("Please enter a valid email"),
    password: (schema) => schema.min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters`),
});

export const signUpUserSchema = insertUserSchema.pick({email: true , password: true , name: true})
export const signInUserSchema = signUpUserSchema.omit({name: true})

export const selectUserSchema = createSelectSchema(users);

// types

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type SignIn = z.infer<typeof signInUserSchema>;
export type SignUp = z.infer<typeof signUpUserSchema>;
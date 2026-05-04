import { session } from "./session";
import { account } from "./account";
import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from 'drizzle-zod';
import { generateUUID } from "@/lib/generate-uuid";
import z from "zod";

export const user = sqliteTable("user", {
    id: text("id").primaryKey().$defaultFn(() => generateUUID()),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: integer("email_verified", { mode: "boolean" })
        .default(false)
        .notNull(),
    image: text("image"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
        .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
        .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
    sessions: many(session),
    accounts: many(account),
}));


// 1. Base Schema (for internal use)

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 10;
const PASSWORD_MIN_LENGTH = 8;

const baseUserSchema = createInsertSchema(user, {
    name: (s) =>
        s.min(NAME_MIN_LENGTH, { message: `Name must be at least ${NAME_MIN_LENGTH} characters long` })
            .max(NAME_MAX_LENGTH, { message: `Name must be no more than ${NAME_MAX_LENGTH} characters` }),

    email: (s) => s.email({ message: "Please enter a valid email address" }),
});

// 2. Signup Schema (User provides Name and Email)
// Note: You usually handle the password inside the Auth provider, 
// so we don't include it in the DB user schema here.
export const signupSchema = baseUserSchema.omit({
    id: true,
    emailVerified: true,
    createdAt: true,
    updatedAt: true,
    image: true
});

// 3. Update Profile Schema (User only changes Name or Image)
export const updateUserSchema = baseUserSchema.pick({
    name: true,
    image: true,
});

// 4. Sign-in Schema (Validation only)
export const signinSchema = signupSchema.omit({ name: true });

// Types based on the schemas above
export type SignupInput = z.infer<typeof signupSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
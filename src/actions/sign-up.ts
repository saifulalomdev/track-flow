import { user, userSchema, type User } from "@/db";
import { defineAction, ActionError } from "astro:actions";
import { drizzle } from "drizzle-orm/d1";

export const signUp = defineAction({
    input: userSchema,
    handler: async (input: User, { locals }) => {
        const runtime = locals.runtime;

        if (!runtime) {
            throw new ActionError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Runtime not available",
            });
        }

        const db = drizzle(runtime.env.DB);

        const data = {
            email: input.email.toLowerCase(),
            name: input.name ?? input.email.split("@")[0],
        };

        try {
            const [inserted] = await db
                .insert(user)
                .values(data)
                .onConflictDoNothing({ target: user.email })
                .returning();

            if (!inserted) {
                throw new ActionError({
                    code: "CONFLICT",
                    message: "Account already exists",
                });
            }

            return {
                success: true,
                message: "Welcome to TrackFlow 🚀",
            };

        } catch (err) {
            console.error(err);
            if (err instanceof ActionError) {
                throw err;
            }
            throw new ActionError({
                code: "BAD_REQUEST",
                message: "Signup failed. Try again.",
            });
        }
    },
});
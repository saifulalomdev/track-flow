import { user, signInSchema, type SignIn, type User } from "@/db";
import { defineAction, ActionError } from "astro:actions";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";

export const signIn = defineAction({
    input: signInSchema,
    handler: async (input, { locals }) => {
        const runtime = locals.runtime;
            
        if (!runtime) {
            throw new ActionError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Runtime not available",
            });
        }

        const db = drizzle(runtime.env.DB);

        try {

            const [foundUser] = await db.select().from(user).where(eq(user.email, input.email))
            console.log(foundUser)
            
            // if (!inserted) {
            //     throw new ActionError({
            //         code: "CONFLICT",
            //         message: "Account already exists",
            //     });
            // }

            return {
                success: true,
                message: "Welcome to TrackFlow",
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
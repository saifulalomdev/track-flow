import { user, signInSchema } from "@/db";
import { session } from "@/db/session";
import { defineAction, ActionError } from "astro:actions";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";

export const signIn = defineAction({
    input: signInSchema as any,
    handler: async (input, { locals, cookies }) => {
        const runtime = locals.runtime;

        if (!runtime) {
            throw new ActionError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Runtime not available",
            });
        }

        const db = drizzle(runtime.env.DB);

        try {
            const [foundUser] = await db
                .select()
                .from(user)
                .where(eq(user.email, input.email));

            if (!foundUser) {
                throw new ActionError({
                    code: "UNAUTHORIZED",
                    message: "Invalid credentials",
                });
            }

            // 🔐 Create session
            const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days

            const [insertedSession] = await db
                .insert(session)
                .values({
                    userId: foundUser.id,
                    expiresAt,
                }).returning({ id: session.id });

            const sessionId = insertedSession.id;

            cookies.set("session_id", sessionId, {
                path: "/",
                httpOnly: true,
                sameSite: "lax",
                secure: import.meta.env.PROD,
                maxAge: 60 * 60 * 24 * 7,
            });

            return {
                success: true,
                message: "Welcome to TrackFlow",
            };

        } catch (err) {
            if (err instanceof ActionError) throw err;

            throw new ActionError({
                code: "BAD_REQUEST",
                message: "Signin failed. Try again.",
            });
        }
    },
});
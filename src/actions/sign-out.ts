import { session } from "@/db";
import { ActionError } from "astro:actions";
import { defineAction } from "astro:actions";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";

export const signOut = defineAction({
    handler: async (_, { locals, cookies }) => {
        const runtime = locals.runtime;
        const sessionId = cookies.get("session_id")?.value;

        if (!sessionId) {
            return { success: true };
        }

        if (!runtime) {
            throw new ActionError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Runtime not available",
            });
        }

        const db = drizzle(runtime.env.DB);

        try {
            // 2. Remove session from the database
            await db.delete(session).where(eq(session.id, sessionId));

            // 3. Clear the cookie
            cookies.delete("session_id", { path: "/" });

            return {
                success: true,
                message: "Logged out successfully",
            };
        } catch (err) {
            console.error("Logout error:", err);
            throw new ActionError({
                code: "BAD_REQUEST",
                message: "Logout failed",
            });
        }
    },
});
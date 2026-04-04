import { defineMiddleware } from "astro:middleware";
import { drizzle } from "drizzle-orm/d1";
import { session } from "@/db/session";
import { eq } from "drizzle-orm";

export const onRequest = defineMiddleware(async (context, next) => {
    const path = context.url.pathname;

    if (path.startsWith("/dashboard")) {
        const runtime = context.locals.runtime;
        const db = drizzle(runtime.env.DB);

        const sessionId = context.cookies.get("session_id")?.value;

        if (!sessionId) {
            return Response.redirect(new URL("/sign-in", context.url));
        }

        const [foundSession] = await db
            .select()
            .from(session)
            .where(eq(session.id, sessionId));

        if (!foundSession || foundSession.expiresAt < Date.now()) {
            return Response.redirect(new URL("/login", context.url));
        }

    }

    return next();
});
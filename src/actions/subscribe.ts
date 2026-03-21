import { subscribers, subscriberSchema } from "@/db/schema";
import { defineAction } from "astro:actions";
import { drizzle } from 'drizzle-orm/d1';
import { count } from "drizzle-orm";
import { ActionError } from "astro:actions";

export const subscribe = defineAction({
    input: subscriberSchema as any,
    handler: async (input, context) => {
        const runtime = context.locals.runtime;
        if (!runtime) {
            throw new ActionError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Cloudflare runtime not found",
            });
        }

        const db = drizzle(runtime.env.DB);

        try {
            const [inserted] = await db
                .insert(subscribers)
                .values({ email: input.email })
                .onConflictDoNothing({ target: subscribers.email })
                .returning();

            const [total] = await db
                .select({ value: count() })
                .from(subscribers);

            if (!inserted) {
                return {
                    success: true,
                    newSubscriber: false,
                    totalSubscribers: total.value,
                    message: "You're already on the waitlist!"
                };
            }

            return {
                success: true,
                newSubscriber: true,
                totalSubscribers: total.value,
                message: "Welcome to the community!"
            };

        } catch (err) {
            console.error("Database Error:", err);
            throw new ActionError({
                code: "BAD_REQUEST",
                message: "We couldn't process your subscription right now.",
            });
        }
    },
});
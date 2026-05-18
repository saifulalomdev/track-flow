// src/pages/api/events.ts
import { createEventSchema, eventService } from "@/db";
import { getDb } from "@/lib/get-db";
import type { APIRoute } from "astro";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export const OPTIONS: APIRoute = async () => {
    return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
    });
};

export const POST: APIRoute = async ({ request, locals }) => {
    // 1. Initialize your Edge D1 Database connection profile safely
    const { env } = locals.runtime;
    const db = getDb(env);

    try {
        // 2. Read the raw JSON body transmission channel safely
        const rawBody = await request.json() as any;

        // 3. Extract Cloudflare Edge location data properties natively
        const cf = (request as any).cf;

        // 4. Flatten and parse the body to match your strict database expectations
        const validatedPayload = createEventSchema.parse({
            websiteId: rawBody.website_id,
            sessionId: rawBody.tf_session_id,
            path: rawBody.path,
            pageTitle: rawBody.page_title,
            eventType: rawBody.event?.type,
            eventValue: rawBody.event?.value ? parseFloat(rawBody.event.value) : null,
            eventCurrency: rawBody.event?.currency || null,
            screenWidth: rawBody.screen?.width,
            screenHeight: rawBody.screen?.height,
            lang: rawBody.lang || null,
            params: rawBody.params || null,
            referrer: rawBody.referrer || rawBody.params.utm_source || "Direct",
            country: cf?.country || "LocalDev",
        });

        // 5. Fire your type-safe database service ingestion operation block!
        const savedRecord = await eventService.ingest(db, validatedPayload);

        // 6. Return a highly optimized, clean response payload structure back to the browser
        return new Response(JSON.stringify({ success: true, id: savedRecord.id }), {
            status: 200,
            headers: {
                ...CORS_HEADERS,
                "Content-Type": "application/json",
            },
        });

    } catch (error: any) {
        console.error("TrackFlow Ingestion Error:", error);

        // Catch Zod parsing errors specifically for clear debugging feedback
        if (error.name === "ZodError") {
            return new Response(JSON.stringify({ error: "Validation failed", details: error.errors }), {
                status: 400,
                headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
            });
        }

        // Generic error safe fallback loop
        return new Response(JSON.stringify({ error: "Internal server processing failure" }), {
            status: 500,
            headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
        });
    }
};
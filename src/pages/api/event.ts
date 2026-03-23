import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, locals }) => {
    const { env } = locals.runtime;

    // 1. Get the Referrer from headers
    const referrer = request.headers.get("referer") || "direct";

    // 2. Get Geolocation (Cloudflare-specific headers)
    const country = request.headers.get("cf-ipcountry") || "Unknown";
    const city = request.headers.get("cf-ipcity") || "Unknown";

    // 3. Get User Agent (Browser/OS info)
    const userAgent = request.headers.get("user-agent") || "Unknown";

    try {
        const body = await request.json();
        const event = {
            type: "page_view",
            timestamp: Date.now(),
            url: request.url,
            referrer,
            country,
            city,
            userAgent,
            data: body
        }
        
        // await env.EVENTS_QUEUE.send(event);

        return new Response(JSON.stringify({ success: true , ...event }), { status: 202 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
    }
};
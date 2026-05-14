import type { APIRoute } from "astro";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

// Preflight requests don't have bodies and need a 204/200 response
export const OPTIONS: APIRoute = async () => {
    return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
    });
};

export const POST: APIRoute = async ({ request, locals }) => {
    // Optional: Defensive check for empty body
    if (request.headers.get("content-length") === "0") {
        return new Response(JSON.stringify({ error: "Empty body" }), { 
            status: 400, 
            headers: CORS_HEADERS 
        });
    }

    const referrer = request.headers.get("referer") || "direct";
    const country = request.headers.get("cf-ipcountry") || "Unknown";
    const city = request.headers.get("cf-ipcity") || "Unknown";
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
        };

        return new Response(
            JSON.stringify({ success: true, ...event }),
            {
                status: 202,
                headers: {
                    ...CORS_HEADERS,
                    "Content-Type": "application/json"
                }
            },
        );
    } catch (error) {
        console.error("JSON Parsing Error:", error);
        return new Response(
            JSON.stringify({ error: "Invalid or empty JSON" }), 
            { 
                status: 400,
                headers: CORS_HEADERS 
            }
        );
    }
};
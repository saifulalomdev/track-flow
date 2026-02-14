import { eq } from "drizzle-orm";
import { createApp } from "@/app/create-app";
import { website } from "@/db/schema";
import * as routes from "./website.routes";

const websiteController = createApp();

// 1. GET ALL
websiteController.openapi(routes.getWebsites, async (c) => {
    const result = await c.var.db.select().from(website);
    return c.json({ success: true, data: result }, 200);
});

// 2. GET BY ID
websiteController.openapi(routes.getWebsiteById, async (c) => {
    const { id } = c.req.valid("param");

    const [result] = await c.var.db
        .select()
        .from(website)
        .where(eq(website.id, id));

    if (!result) {
        return c.json({ success: false, error: "Website not found" }, 404);
    }

    return c.json({ success: true, data: result }, 200);
});

// 3. CREATE
websiteController.openapi(routes.createWebsite, async (c) => {
    const data = c.req.valid("json");

    const [result] = await c.var.db
        .insert(website)
        .values(data)
        .returning();

    return c.json({ success: true, data: result }, 201);
});

// 4. UPDATE (PATCH)
websiteController.openapi(routes.updateWebsite, async (c) => {
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");

    const [result] = await c.var.db
        .update(website)
        .set(data)
        .where(eq(website.id, id))
        .returning();

    if (!result) {
        return c.json({ success: false, error: "Website not found" }, 404);
    }

    return c.json({ success: true, data: result }, 200);
});

// 5. DELETE
websiteController.openapi(routes.deleteWebsite, async (c) => {
    const { id } = c.req.valid("param");

    const [result] = await c.var.db
        .delete(website)
        .where(eq(website.id, id))
        .returning();

    if (!result) {
        return c.json({ success: false, error: "Website not found" }, 404);
    }

    return c.json({ success: true, data: result }, 200);
});

export default websiteController;
import { desc, eq } from "drizzle-orm";
import { createApp } from "@/app/create-app";
import { user, site } from "@/db/schema";
import * as routes from "./site.routes";

const websiteController = createApp();

// 1. GET ALL
websiteController.openapi(routes.getSites, async (c) => {
    const userId = c.var.userId;
    const result = await c.var.db.select()
        .from(site)
        .where(eq(site.userId, userId))
        .orderBy(desc(site));
    return c.json({ success: true, data: result }, 200);
});

// 2. GET BY ID
websiteController.openapi(routes.getSiteById, async (c) => {
    const { id } = c.req.valid("param");

    const [result] = await c.var.db
        .select()
        .from(site)
        .where(eq(site.id, id));

    if (!result) {
        return c.json({ success: false, error: "Website not found" }, 404);
    }

    return c.json({ success: true, data: result }, 200);
});

// 3. CREATE
websiteController.openapi(routes.createSite, async (c) => {
    const data = c.req.valid("json"); // This contains title, url, isActive
    const userId = c.get("userId");   // This comes from middleware
    // const data = await c.req.json()
    const db = c.get("db");
    console.log(data)

    const [newWebsite] = await db.insert(site).values({
        ...data,      // Spread title, url, isActive
        userId: userId // MANUALLY add the userId here!
    }).returning();

    return c.json({ data: newWebsite }, 201);
});
// 4. UPDATE (PATCH)
websiteController.openapi(routes.updateSite, async (c) => {
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");

    const [result] = await c.var.db
        .update(site)
        .set(data)
        .where(eq(site.id, id))
        .returning();

    if (!result) {
        return c.json({ success: false, error: "Website not found" }, 404);
    }

    return c.json({ success: true, data: result }, 200);
});

// 5. DELETE
websiteController.openapi(routes.deleteSite, async (c) => {
    const { id } = c.req.valid("param");

    const [result] = await c.var.db
        .delete(site)
        .where(eq(site.id, id))
        .returning();

    if (!result) {
        return c.json({ success: false, error: "Website not found" }, 404);
    }

    return c.json({ success: true, data: result }, 200);
});

export default websiteController;
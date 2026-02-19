import { eq } from "drizzle-orm";
import { createApp } from "@/app/create-app";
import { user, website } from "@/db/schema";
import * as routes from "./website.routes";
import * as schema from '../../db/schema/index'

const websiteController = createApp();

// 1. GET ALL
websiteController.openapi(routes.getWebsites, async (c) => {
    const userId = c.var.userId;
    const result = await c.var.db.select().from(website).where(eq(user.id, userId));
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
// features/sites/router.ts (example)
websiteController.openapi(routes.createWebsite, async (c) => {
  const data = c.req.valid("json"); // This contains title, url, isActive
  const userId = c.get("userId");   // This comes from your middleware

  const db = c.get("db");

  try {
    const [newWebsite] = await db.insert(schema.website).values({
      ...data,      // Spread title, url, isActive
      userId: userId // MANUALLY add the userId here!
    }).returning();

    return c.json({ data: newWebsite }, 201);
  } catch (error) {
    // If you get here, D1 will log "Failed query"
    return c.json({ error: "Database error" }, 400);
  }
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
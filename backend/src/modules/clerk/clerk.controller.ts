import { createApp } from "@/app/create-app";
import { user } from "@/db/schema";
import { verifyWebhook } from "@clerk/backend/webhooks";
import { eq } from "drizzle-orm";


const clerkController = createApp();

clerkController.post("/clerk", async (c) => {

  const evt = await verifyWebhook(c.req.raw);
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { email_addresses, id } = evt.data;
    const email = email_addresses[0].email_address;

    await c.var.db.insert(user).values({ id, email }).returning();
  }

  if (eventType === "user.updated") {
    const { email_addresses, id } = evt.data;
    const email = email_addresses[0].email_address;

    await c.var.db.update(user)
      .set({ email })
      .where(eq(user.id, id));
  }
  if (eventType === "user.deleted") {
    const { id } = evt.data;

    if (id) {
      await c.var.db.delete(user).where(eq(user.id, id));
    }
  }
  return c.json({ success: true }, 200)
})

export default clerkController
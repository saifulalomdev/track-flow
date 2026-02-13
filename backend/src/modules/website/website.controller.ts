import { createApp } from "@/app/create-app";
import { createWebsite } from "./website.routes";
import { website } from "@/db/schema";

const websiteController = createApp();

websiteController.openapi(createWebsite, async (c) => {
    const data = c.req.valid("json");
    console.log(data)
    const result = await c.var.db.insert(website).values(data);
    console.log(result)
    return c.json({ success: true , result}, 201)
})

export default websiteController
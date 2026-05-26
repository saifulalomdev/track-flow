import { drizzle } from "drizzle-orm/d1";
import { faker } from "@faker-js/faker";
import { site, event } from "../db/schema"; // Adjust paths to your schema file

export default {
  async fetch(request: Request, env: { DB: D1Database }) {
    const db = drizzle(env.DB);

    console.log("⏳ Wiping old tables...");
    await db.delete(event).execute();
    await db.delete(site).execute();

    const sites = [];
    const events = [];

    // 1. Generate Sites
    const siteTemplates = [
      { id: faker.string.uuid(), title: "E-commerce Store", url: "https://shop.example.com" },
      { id: faker.string.uuid(), title: "Tech Blog", url: "https://blog.example.com" },
      { id: faker.string.uuid(), title: "SaaS Dashboard", url: "https://app.example.com" },
    ];

    for (const template of siteTemplates) {
      sites.push({
        id: template.id,
        title: template.title,
        url: template.url,
        isActive: true, 
      });

      // 2. Generate Events for this Site
      const eventCount = 25; 
      for (let i = 0; i < eventCount; i++) {
        const isPurchase = faker.datatype.boolean({ probability: 0.1 });
        const screenResolution = faker.helpers.arrayElement([
          { width: 1920, height: 1080 },
          { width: 1440, height: 900 },
          { width: 390, height: 844 },
        ]);

        // Standard Drizzle CamelCase mappings matching your typescript definition fields
        events.push({
          id: faker.string.uuid(),
          websiteId: template.id, 
          sessionId: faker.string.uuid(), 
          url: `${template.url}/${faker.helpers.arrayElement(["pricing", "docs", "features"])}`,
          pageTitle: faker.lorem.words(2), 
          eventType: isPurchase ? "purchase" : "pageview", 
          eventValue: isPurchase ? parseFloat(faker.commerce.price({ min: 10, max: 100 })) : null, 
          eventCurrency: isPurchase ? "USD" : null, 
          screenWidth: screenResolution.width, 
          screenHeight: screenResolution.height, 
          lang: faker.helpers.arrayElement(["en-US", "en-GB", "es-ES"]),
          referrer: faker.internet.url(),
          country: faker.location.countryCode(),
          params: { utm_source: "google" }, // Kept as object; Drizzle automatically handles mapping
          timestamp: faker.date.recent({ days: 7 }).toISOString(),
        });
      }
    }

    console.log(`📡 Writing ${sites.length} sites to local D1 instance...`);
    if (sites.length > 0) {
      await db.insert(site).values(sites).execute();
    }
    
    // Brief window for index safety
    await new Promise((resolve) => setTimeout(resolve, 50));

    console.log(`📦 Slicing ${events.length} records into highly restrictive local chunks...`);
    if (events.length > 0) {
      // 3 records * 15 columns = 45 variables. This passes local Miniflare limits easily!
      const CHUNK_SIZE = 3; 
      for (let i = 0; i < events.length; i += CHUNK_SIZE) {
        const chunk = events.slice(i, i + CHUNK_SIZE);
        await db.insert(event).values(chunk).execute();
      }
    }

    return new Response("🚀 Local D1 environment successfully bypassed and populated!");
  }
};
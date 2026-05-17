import { eq, and, gte, lte, desc } from "drizzle-orm";
import { events } from "../schema"; 
import type { NewTrackFlowEvent, TrackFlowEvent } from "../schema/event";
import type { D1Instance } from "@/lib/get-db";

export const eventService = {
  /**
   * INGESTION: Appends tracked device data rows directly onto Cloudflare D1
   */
  async ingest(db: D1Instance, data: NewTrackFlowEvent): Promise<TrackFlowEvent> {
    const [newEvent] = await db
      .insert(events)
      .values(data)
      .returning();
      
    return newEvent;
  },

  /**
   * SCAN: Retrieves chronologically indexed historical log streams mapping to individual properties
   */
  async getByWebsiteId(
    db: D1Instance, 
    websiteId: string, 
    limitNum = 100
  ): Promise<TrackFlowEvent[]> {
    return await db
      .select()
      .from(events)
      .where(eq(events.websiteId, websiteId))
      .orderBy(desc(events.timestamp))
      .limit(limitNum);
  },

  /**
   * RANGE REPORTING: Queries scoped windows matching dynamic timestamp filtering boundaries
   */
  async getWebsiteEventsInWindow(
    db: D1Instance,
    websiteId: string,
    startDateISO: string,
    endDateISO: string
  ): Promise<TrackFlowEvent[]> {
    return await db
      .select()
      .from(events)
      .where(
        and(
          eq(events.websiteId, websiteId),
          gte(events.timestamp, startDateISO),
          lte(events.timestamp, endDateISO)
        )
      )
      .orderBy(desc(events.timestamp));
  }
};
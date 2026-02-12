import { getDb } from "./db/client";
import * as schema from "./db/schema";

export async function queue(batch: MessageBatch<any>, env: Env) {
    const db = getDb(env.DB);
    
    const events = batch.messages.flatMap(m => m.body).map(e => ({
        ...e,
        timestamp: e.timestamp || new Date().toISOString() 
    }));

    if (events.length > 0) {
        try {
            await db.insert(schema.event).values(events);
            console.log("Inserted successfully with manual timestamps");
        } catch (err) {
            console.error("Still failing:", err);
            throw err;
        }
    }
}

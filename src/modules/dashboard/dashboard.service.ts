import { and, gte, lte, sql, desc, eq } from "drizzle-orm";
import { event } from "@/db/schema";
import type { D1Instance } from "@/lib";

interface GetOverviewParams {
    db: D1Instance,
    websiteId: string,
    dateFrom: string,
    dateTo: string
}

export const dashboardService = {
    async getOverviewData({ db, websiteId, dateFrom, dateTo }: GetOverviewParams) {
        const metricsQuery = await db.run(
            sql`
        WITH session_metrics AS (
            SELECT 
                session_id,
                count(id) as hits_count,
                (strftime('%s', max(timestamp)) - strftime('%s', min(timestamp))) as duration_seconds
            FROM ${event}
            WHERE website_id = ${websiteId} AND timestamp >= ${dateFrom} AND timestamp <= ${dateTo}
            GROUP BY session_id
        )
        SELECT
            count(session_id) as total_traffic,
            coalesce(round((count(case when hits_count = 1 then 1 end) * 100.0) / nullif(count(session_id), 0), 2), 0) as bounce_rate,
            coalesce(round(avg(duration_seconds), 0), 0) as avg_session_duration
        FROM session_metrics
      `
        );

        const rawMetrics = metricsQuery.results[0] as any;

        // // 2. Fetch Countries
        // const countries = await db
        //   .select({ name: event.country, count: sql<number>`count(distinct ${event.sessionId})` })
        //   .from(event)
        //   .where(and(eq(event.websiteId, websiteId), gte(event.timestamp, dateFrom), lte(event.timestamp, dateTo)))
        //   .groupBy(event.country)
        //   .orderBy(desc(sql`count(distinct ${event.sessionId})`))
        //   .limit(5);

        // // 3. Fetch Platforms
        // const platforms = await db
        //   .select({ name: event.device, count: sql<number>`count(${event.id})` })
        //   .from(event)
        //   .where(and(eq(event.websiteId, websiteId), gte(event.timestamp, dateFrom), lte(event.timestamp, dateTo)))
        //   .groupBy(event.device);

        return {
            metrics: {
                totalTraffic: Number(rawMetrics?.total_traffic ?? 0),
                bounceRate: Number(rawMetrics?.bounce_rate ?? 0),
                avgSessionDuration: Number(rawMetrics?.avg_session_duration ?? 0),
            },
            //   countries: countries ?? [],
            //   platforms: platforms ?? [],
        };
    }
}

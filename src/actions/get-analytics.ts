import { getDb } from "@/lib/get-db";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { event } from "@/db/schema";
import { and, gte, lte, sql, desc, eq } from "drizzle-orm";
import { siteService } from "@/db";
import { subMonths, format } from "date-fns";

export const getAnalyticsAndSites = defineAction({
    accept: "json",
    input: z.object({
        websiteId: z.string(),
        range: z.object({
            from: z.string(),
            to: z.string(),
        }),
    }).optional(),
    handler: async (input, context) => {
        const env = context.locals.runtime?.env;
        const db = getDb(env);

        const today = new Date();
        let websiteId = input?.websiteId;

        const dateFrom = input?.range.from || format(subMonths(today, 1), "yyyy-MM-dd HH:mm:ss");
        const dateTo = input?.range.to || format(today, "yyyy-MM-dd HH:mm:ss");

        if (!websiteId) {
            const siteLists = await siteService.findAll(db);
            if (!siteLists || siteLists.length === 0) {
                throw new ActionError({
                    code: "BAD_REQUEST",
                    message: "No active tracking environments found."
                })
            }
            websiteId = siteLists[0].id;
        }

        const metricsQuery = await db.run(
            sql`
                    WITH session_metrics AS (
                        SELECT 
                            session_id,
                            count(id) as hits_count,
                            (strftime('%s', max(timestamp)) - strftime('%s', min(timestamp))) as duration_seconds,
                            max(case when event_type = 'conversion' then 1 else 0 end) as converted
                        FROM ${event}
                        WHERE website_id = ${websiteId} 
                          AND timestamp >= ${dateFrom} 
                          AND timestamp <= ${dateTo}
                        GROUP BY session_id
                    )
                    SELECT
                        count(session_id) as total_traffic,
                        coalesce(round((count(case when hits_count = 1 then 1 end) * 100.0) / nullif(count(session_id), 0), 2), 0) as bounce_rate,
                        coalesce(round(avg(duration_seconds), 0), 0) as avg_session_duration,
                        coalesce(round((sum(converted) * 100.0) / nullif(count(session_id), 0), 2), 0) as conversion_rate
                    FROM session_metrics
                `
        );

        // Cloudflare D1 returns array items via results property safely
        const rawMetrics = metricsQuery.results[0] as unknown as {
            total_traffic: number;
            bounce_rate: number;
            avg_session_duration: number;
            conversion_rate: number;
        } | undefined;

        // 2. Fetch Page Ranking Top Views Breakdown (Fixed variable references and type coercion)
        const pageViewsBreakdown = await db
            .select({
                url: event.url,
                pageTitle: event.pageTitle,
                views: sql<number>`count(${event.id})`,
            })
            .from(event)
            .where(
                and(
                    eq(event.websiteId, websiteId),
                    gte(event.timestamp, dateFrom), // Fixed from -> dateFrom
                    lte(event.timestamp, dateTo)   // Fixed to -> dateTo
                )
            )
            .groupBy(event.url, event.pageTitle)
            .orderBy(desc(sql`count(${event.id})`))
            .limit(10);

        return {
            success: true,
            data: {
                metrics: {
                    totalTraffic: Number(rawMetrics?.total_traffic ?? 0),
                    bounceRate: Number(rawMetrics?.bounce_rate ?? 0),
                    avgSessionDuration: Number(rawMetrics?.avg_session_duration ?? 0),
                    conversionRate: Number(rawMetrics?.conversion_rate ?? 0),
                },
                pages: pageViewsBreakdown ?? [],
            },
        };


    },
});
import { and, gte, lte, sql, desc, eq } from "drizzle-orm";
import { event } from "@/db/schema";
import { getDefaultTimeRange, type D1Instance } from "@/lib";
import { siteService } from "@/db";
import type { DashboardPageProps, DashboardStatsProps } from "./dashboard.types";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface GetOverviewParams {
    db: D1Instance;
    websiteId?: string;
    dateRange?: DateRange;
}

export const dashboardService = {
    async getOverviewData({ db, websiteId, dateRange }: GetOverviewParams): Promise<DashboardPageProps> {
        // 1. Establish absolute time boundaries for the database query
        const defaultRange = getDefaultTimeRange();

        // Use custom ranges if picked, otherwise drop back into raw date-fns fallbacks
        // Keep these as strings specifically for the raw SQLite text query filter match
        const queryDateFrom = dateRange?.from
            ? format(dateRange.from, "yyyy-MM-dd HH:mm:ss")
            : defaultRange.from;
        const queryDateTo = dateRange?.to
            ? format(dateRange.to, "yyyy-MM-dd HH:mm:ss")
            : defaultRange.to;

        // 2. Fetch baseline context models
        const latestSite = await siteService.findLatest(db);
        const siteList = await siteService.findAll(db);

        // Compute targets: Use passed websiteId or default to the most recent one
        const activeSiteId = websiteId || latestSite?.id;

        // 3. Fallback structures if no websites exist yet
        if (!activeSiteId) {
            return {
                dateRange: {
                    from: dateRange?.from || defaultRange.from || new Date(),
                    to: dateRange?.to || defaultRange.to || new Date()
                },
                defaultSiteId: undefined,
                sites: [],
                dashboardStats: this.getEmptyStats()
            };
        }

        // 4. Raw D1 query execution utilizing Drizzle's schema interpolator safely
        const metricsQuery = await db.run(sql`
            WITH session_metrics AS (
                SELECT 
                    session_id,
                    count(id) as hits_count,
                    (strftime('%s', max(timestamp)) - strftime('%s', min(timestamp))) as duration_seconds,
                    sum(case when event_type = 'conversion' then 1 else 0 end) as conversion_count
                FROM ${event}
                WHERE website_id = ${activeSiteId} 
                AND timestamp >= ${queryDateFrom instanceof Date ? queryDateFrom.toISOString() : String(queryDateFrom)} 
                AND timestamp <= ${queryDateTo instanceof Date ? queryDateTo.toISOString() : String(queryDateTo)}
                GROUP BY session_id
            )
            SELECT
                count(session_id) as total_traffic,
                coalesce(round((count(case when hits_count = 1 then 1 end) * 100.0) / nullif(count(session_id), 0), 2), 0) as bounce_rate,
                coalesce(round(avg(duration_seconds), 0), 0) as avg_session_duration,
                coalesce(round((count(case when conversion_count > 0 then 1 end) * 100.0) / nullif(count(session_id), 0), 2), 0) as conversion_rate
            FROM session_metrics`
        );

        const practiceData = await db.get(sql`
        select country 
        from ${event}
        where website_id = ${activeSiteId}
        `);


        console.log(practiceData)
        // D1 safe array extractor boundary layout mapping
        const rawMetrics = (metricsQuery.results?.[0] as any) || {};

        // 5. Structure fields explicitly using DashboardStatsProps[] typing with 'as const'
        const stats: DashboardStatsProps[] = [
            {
                name: "totalTraffic" as const,
                value: Number(rawMetrics.total_traffic || 0),
                change: 0.0,
            },
            {
                name: "bounceRate" as const,
                value: Number(rawMetrics.bounce_rate || 0),
                change: 0.0,
            },
            {
                name: "avgSessionDuration" as const,
                value: Number(rawMetrics.avg_session_duration || 0),
                change: 0.0,
            },
            {
                name: "conversionRate" as const,
                value: Number(rawMetrics.conversion_rate || 0),
                change: 0.0,
            },
        ];

        return {
            // Return authentic JavaScript Date targets back out to page layouts
            dateRange: {
                from: dateRange?.from || defaultRange.from || new Date(),
                to: dateRange?.to || defaultRange.to || new Date()
            },
            defaultSiteId: activeSiteId,
            sites: siteList,
            dashboardStats: stats
        };
    },

    getEmptyStats(): DashboardStatsProps[] {
        return [
            { name: "totalTraffic" as const, value: 0, change: 0 },
            { name: "bounceRate" as const, value: 0, change: 0 },
            { name: "avgSessionDuration" as const, value: 0, change: 0 },
            { name: "conversionRate" as const, value: 0, change: 0 },
        ];
    }
};
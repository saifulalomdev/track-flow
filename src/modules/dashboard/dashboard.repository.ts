// src/modules/dashboard/dashboard.repository.ts
import type { D1Instance } from "@/lib";
import { sql } from "drizzle-orm";
import { event } from "@/db/schema";

export interface RepositoryQueryParams {
    activeSiteId: string;
    currentFromStr: string;
    currentToStr: string;
    prevFromStr: string;
    prevToStr: string;
}

export const dashboardRepository = {
    getStats: (db: D1Instance, { activeSiteId, currentFromStr, currentToStr, prevFromStr }: RepositoryQueryParams) => {
        return db.run(sql`
            WITH session_metrics AS (
                SELECT 
                    session_id,
                    CASE WHEN timestamp >= ${currentFromStr} AND timestamp <= ${currentToStr} THEN 1 ELSE 0 END as is_current,
                    count(id) as hits_count,
                    (strftime('%s', max(timestamp)) - strftime('%s', min(timestamp))) as duration_seconds,
                    sum(case when event_type = 'conversion' then 1 else 0 end) as conversion_count
                FROM ${event}
                WHERE website_id = ${activeSiteId} AND timestamp >= ${prevFromStr} AND timestamp <= ${currentToStr}
                GROUP BY session_id
            )
            SELECT
                count(case when is_current = 1 then session_id end) as total_traffic,
                coalesce(round((count(case when is_current = 1 and hits_count = 1 then 1 end) * 100.0) / nullif(count(case when is_current = 1 then session_id end), 0), 0), 0) as bounce_rate,
                coalesce(round(avg(case when is_current = 1 then duration_seconds end), 0), 0) as avg_duration,
                coalesce(round((count(case when is_current = 1 and conversion_count > 0 then 1 end) * 100.0) / nullif(count(case when is_current = 1 then session_id end), 0), 0), 0) as conversion_rate,
                count(case when is_current = 0 then session_id end) as prev_total_traffic,
                coalesce(round((count(case when is_current = 0 and hits_count = 1 then 1 end) * 100.0) / nullif(count(case when is_current = 0 then session_id end), 0), 0), 0) as prev_bounce_rate,
                coalesce(round(avg(case when is_current = 0 then duration_seconds end), 0), 0) as prev_avg_duration,
                coalesce(round((count(case when is_current = 0 and conversion_count > 0 then 1 end) * 100.0) / nullif(count(case when is_current = 0 then session_id end), 0), 0), 0) as prev_conversion_rate
            FROM session_metrics
        `);
    },

    getPageviews: (db: D1Instance, { activeSiteId, currentFromStr, currentToStr }: RepositoryQueryParams) => {
        return db.run(sql`
            SELECT page_title as title, url, count(id) as views
            FROM ${event}
            WHERE website_id = ${activeSiteId} AND timestamp >= ${currentFromStr} AND timestamp <= ${currentToStr}
            GROUP BY url, page_title 
            ORDER BY views DESC 
            LIMIT 10
        `);
    },

    getDevices: (db: D1Instance, { activeSiteId, currentFromStr, currentToStr }: RepositoryQueryParams) => {
        return db.run(sql`
            WITH device_counts AS (
                SELECT 
                    CASE 
                        WHEN screen_width >= 1024 THEN 'computer/laptop'
                        WHEN screen_width >= 768 THEN 'tablet'
                        ELSE 'mobile'
                    END as device_name,
                    count(DISTINCT session_id) as distinct_sessions
                FROM ${event}
                WHERE website_id = ${activeSiteId} AND timestamp >= ${currentFromStr} AND timestamp <= ${currentToStr}
                GROUP BY device_name
            )
            SELECT 
                device_name as name,
                coalesce(round((distinct_sessions * 100.0) / (SELECT sum(distinct_sessions) FROM device_counts), 0), 0) || '%' as value
            FROM device_counts
        `);
    },

    getCountries: (db: D1Instance, { activeSiteId, currentFromStr, currentToStr }: RepositoryQueryParams) => {
        return db.run(sql`
            SELECT country as name, sum(distinct session_id) as visitors
            FROM ${event}
            WHERE website_id = ${activeSiteId} AND timestamp >= ${currentFromStr} AND timestamp <= ${currentToStr}
            GROUP BY country 
            ORDER BY count(DISTINCT session_id) DESC 
            LIMIT 5
        `);
    },

    getTrends: (db: D1Instance, { currentFromStr, currentToStr, activeSiteId }: RepositoryQueryParams) => {
        return db.run(sql`
            WITH RECURSIVE buckets(n) AS (
                SELECT 0 UNION ALL SELECT n + 1 FROM buckets WHERE n < 11
            ),
            time_bounds AS (
                SELECT 
                    strftime('%s', ${currentFromStr}) as start_ts,
                    (strftime('%s', ${currentToStr}) - strftime('%s', ${currentFromStr})) / 12.0 as bucket_width
            )
            SELECT 
                b.n as bucket_index,
                count(e.id) as current_views
            FROM buckets b
            CROSS JOIN time_bounds tb
            LEFT JOIN ${event} e ON e.website_id = ${activeSiteId} 
                AND strftime('%s', e.timestamp) >= tb.start_ts + (b.n * tb.bucket_width)
                AND strftime('%s', e.timestamp) < tb.start_ts + ((b.n + 1) * tb.bucket_width)
            GROUP BY b.n
            ORDER BY b.n ASC
        `);
    }
};
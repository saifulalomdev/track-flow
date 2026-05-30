// src/modules/dashboard/dashboard.service.ts
import { getDefaultTimeRange } from "@/lib";
import { siteService } from "@/db";
import { format, subDays, differenceInCalendarDays } from "date-fns";
import { dashboardRepository } from "./dashboard.repository";
import type { DashboardPageProps, DashboardStatItem, GetOverviewParams } from "./dashboard.types";
import { getCountryName, getPlatformName } from "./dashboard-libs";

export const dashboardService = {
    async getOverviewData({ db, websiteId, dateRange }: GetOverviewParams): Promise<DashboardPageProps | null> {
        const defaultRange = getDefaultTimeRange();
        const dateFrom = dateRange?.from || defaultRange.from || new Date();
        const dateTo = dateRange?.to || defaultRange.to || new Date();

        const daysDifference = differenceInCalendarDays(dateTo, dateFrom) + 1;
        const prevDateFrom = subDays(dateFrom, daysDifference);
        const prevDateTo = subDays(dateTo, daysDifference);

        // 1. Resolve site information instantly to prevent client-side UI flickering
        const latestSite = await siteService.findLatest(db);
        const siteList = await siteService.findAll(db);
        const activeSiteId = websiteId || latestSite?.id || "";

        const queryCtx = {
            activeSiteId,
            currentFromStr: format(dateFrom, "yyyy-MM-dd HH:mm:ss"),
            currentToStr: format(dateTo, "yyyy-MM-dd HH:mm:ss"),
            prevFromStr: format(prevDateFrom, "yyyy-MM-dd HH:mm:ss"),
            prevToStr: format(prevDateTo, "yyyy-MM-dd HH:mm:ss")
        };

        if (!queryCtx.activeSiteId) return null;

        // 2. Parallelize standalone query functions via Promise.all
        const [
            statsQuery,
            pageviewsQuery,
            devicesQuery,
            countriesQuery,
            trendsQuery,
            referrersQuery
        ] = await Promise.all([
            dashboardRepository.getStats(db, queryCtx),
            dashboardRepository.getPageviews(db, queryCtx),
            dashboardRepository.getDevices(db, queryCtx),
            dashboardRepository.getCountries(db, queryCtx),
            dashboardRepository.getTrends(db, queryCtx),
            dashboardRepository.getReferrers(db, queryCtx)
        ]);

        const rawStats = (statsQuery.results?.[0] as Record<string, unknown>) || {};
        const rawPageviews = (pageviewsQuery.results || []) as Record<string, unknown>[];
        const rawDevices = (devicesQuery.results || []) as Record<string, unknown>[];
        const rawCountries = (countriesQuery.results || []) as Record<string, unknown>[];
        const rawTrends = (trendsQuery.results || []) as Record<string, unknown>[];
        const rawReferrers = (referrersQuery.results || []) as Record<string, unknown>[];

        // 3. Transform database stats into explicitly typed items
        const stats: DashboardStatItem[] = [
            {
                name: "totalTraffic",
                value: Number(rawStats.total_traffic || 0) >= 1000
                    ? `${(Number(rawStats.total_traffic || 0) / 1000).toFixed(0)}k`
                    : String(rawStats.total_traffic || 0),
                changes: `${Number(rawStats.total_traffic || 0) >= Number(rawStats.prev_total_traffic || 0) ? "+" : ""}${Math.round(((Number(rawStats.total_traffic || 0) - Number(rawStats.prev_total_traffic || 0)) / (Number(rawStats.prev_total_traffic || 1) || 1)) * 100)}%`
            },
            {
                name: "bounceRate",
                value: `${rawStats.bounce_rate || 0}%`,
                changes: "0%"
            },
            {
                name: "avgSessionDuration",
                value: `${rawStats.avg_duration || 0}s`,
                changes: "0%"
            },
            {
                name: "conversionRate",
                value: `${rawStats.conversion_rate || 0}%`,
                changes: "0%"
            }
        ];

        console.log()
        console.log(rawReferrers.map(({name , visitors}: any) => ({ name: getPlatformName(name), visitors})))

        return {
            dateRange: {
                from: dateFrom,
                to: dateTo
            },
            stats,
            pageviews: rawPageviews.map(p => ({
                title: String(p.title || ""),
                url: String(p.url || ""),
                views: Number(p.views || 0)
            })),
            devices: rawDevices.map(d => ({
                name: String(d.name || ""),
                value: String(d.value || "0%")
            })),
            trafficTrends: rawTrends.map(t => Number(t.current_views || 0)),
            countries: rawCountries.map(({name , visitors}: any) => ({ name: getCountryName(name), visitors})),
            sites: siteList,
            activeSiteId
        };
    }
};
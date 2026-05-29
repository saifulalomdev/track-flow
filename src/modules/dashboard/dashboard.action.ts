// src/modules/dashboard/dashboard.action.ts
import { ActionError, defineAction } from "astro:actions";
import { getDb } from "@/lib/get-db";
import { siteService } from "@/db";
import { subMonths, format } from "date-fns";
import { dashboardService } from "./dashboard.service";
import { getAnalyticsSchema } from "./dashboard.schema";

export const getDashboardOverview = defineAction({
    accept: "json",
    input: getAnalyticsSchema as any,
    handler: async (input, context) => {
        // 1. Core platform initialization
        const env = context.locals.runtime?.env;
        const db = getDb(env);

        // 2. Handle strict SQLite date strings: "yyyy-MM-dd HH:mm:ss"
        const today = new Date();
        const dateFrom = input?.range?.from || format(subMonths(today, 1), "yyyy-MM-dd HH:mm:ss");
        const dateTo = input?.range?.to || format(today, "yyyy-MM-dd HH:mm:ss");

        let websiteId = input?.websiteId;

        // 3. Fallback orchestration if no specific site is requested yet
        if (!websiteId) {
            const siteLists = await siteService.findAll(db);

            // Return null data safely so the frontend can display a setup onboarding screen
            if (!siteLists || siteLists.length === 0) {
                return {
                    metrics: { totalTraffic: 0, bounceRate: 0, avgSessionDuration: 0 },
                    countries: [],
                    platforms: [],
                    noActiveSites: true,
                };
            }

            websiteId = siteLists[0].id;
        }

        // 4. Delegate heavy lifting to your isolated, testable service layer
        const data = await dashboardService.getOverviewData({
            db,
            websiteId,
            dateRange: {
                from: dateFrom,
                to: dateTo
            }
        });

        return {
            ...data,
            activeWebsiteId: websiteId,
            noActiveSites: false
        };

    },
});

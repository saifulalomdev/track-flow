import type { Site } from "@/db";
import type { DateRange } from "react-day-picker"

export interface DashboardStatsProps {
    name?: "conversionRate" | "avgSessionDuration" | "bounceRate" | "totalTraffic",
    value?: number,
    change?: number,
}

export interface DashboardPageProps {
    dashboardStats: DashboardStatsProps[];
    dateRange: DateRange;
    defaultSiteId: string | undefined;
    sites: Site[];
    errorMsg?: string;
}
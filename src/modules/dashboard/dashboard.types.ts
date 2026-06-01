import type { Site } from "@/db";
import type { D1Instance } from "@/lib";
import type { DateRange } from "react-day-picker";

export interface DashboardStatItem {
    name: "totalTraffic" | "bounceRate" | "avgSessionDuration" | "conversionRate";
    value: string;
    changes: string;
}

export interface PageviewItem {
    title: string;
    url: string;
    views: number;
}

export interface DeviceItem {
    name: "Desktop" | "Tablet" | "Mobile";
    visitors: number;
}

export interface CountryItem {
    name: string;
    visitors: number;
}

export interface DashboardPageProps {
    stats: DashboardStatItem[] | undefined;
    pageviews: PageviewItem[];
    devices: DeviceItem[];
    trafficTrends: number[];
    countries: CountryItem[];
    referrers: CountryItem[];
    sites: Site[];
    activeSiteId: string | undefined;
    dateRange: DateRange;
    errorMsg?: string
}

export interface GetOverviewParams {
    db: D1Instance,
    dateRange?: DateRange,
    websiteId?: string,
}
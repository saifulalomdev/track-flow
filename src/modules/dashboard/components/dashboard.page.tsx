import * as React from "react";
import { type DateRange } from "react-day-picker";

import { PageHeader } from "@/components/ui/page-header";
import ErrorAlert from "@/components/ui/error-alert";
import DashboardSiteSelector from "./dashboard.site.selector";
import { DashboardDateRangePicker } from "./dashboard.date.picker";
import DashboardStatsGrid from "./dashboard.stats.grid";
import { PageviewsCard } from "./dashboard.pageviews";
import TrafficMap from "./dashboard.traffic.map";

import type { DashboardPageProps } from "../dashboard.types";
import { useAction } from "@/hooks/use-action";
import { actions } from "astro:actions";
import { DashboardReferrerList } from "./dashboard.referrer.list";
import { DevicesCard } from "./dashbaord.device";
import { TrafficTrendsChart } from "./dashbaord.barchart";

export function DashboardPage({
    sites,
    errorMsg,
    activeSiteId,
    dateRange,
    stats,
    pageviews,
    countries,
    referrers,
    devices
}: DashboardPageProps) {
    const [siteId, setSiteId] = React.useState(activeSiteId || "");
    const [date, setDate] = React.useState<DateRange | undefined>(dateRange);

    const [dashboardData, setDashboardData] =
        React.useState<DashboardPageProps>({
            sites,
            errorMsg,
            activeSiteId,
            dateRange,
            stats,
            pageviews,
            countries,
            devices: devices || [],
            trafficTrends: [],
            referrers: referrers
        });


    const { execute } = useAction(
        actions.dashboardActions.getOverview,
        {
            loadingMessage: "Updating analytics...",
            successMessage: "Dashboard updated",
            onSuccess: (data) => {
                console.log(data)
                if (data) setDashboardData(data)
            },
            onError: (err) => {
                console.error(err);
            },
        }
    );

    React.useEffect(() => {
        if (!siteId || !date?.from || !date?.to) return;

        execute({
            websiteId: siteId,
            dateRange: {
                from: date.from,
                to: date.to,
            },
        });
    }, [siteId, date]);

    return (
        <div className="space-y-4">
            <ErrorAlert errorMsg={dashboardData.errorMsg || errorMsg} />
            <PageHeader
                title="Overview"
                description="Welcome back. Here's what's happening today."
            >
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full">
                    <DashboardSiteSelector
                        selectedSiteId={siteId}
                        onSiteChange={setSiteId}
                        sites={dashboardData.sites || sites}
                    />

                    <DashboardDateRangePicker
                        date={date}
                        onDateChange={setDate}
                    />
                </div>
            </PageHeader>

            <DashboardStatsGrid stats={dashboardData.stats} />
            
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <TrafficTrendsChart
                    className="lg:col-span-2"
                    data={dashboardData.trafficTrends || []}
                    title="Network Hit Volumes"
                />
                <DevicesCard data={dashboardData.devices} />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <DashboardReferrerList data={dashboardData.referrers || []} />
                <PageviewsCard className="lg:col-span-2" pageviews={dashboardData.pageviews || []} />
            </div>
            <TrafficMap data={dashboardData.countries} />
        </div>
    );
}
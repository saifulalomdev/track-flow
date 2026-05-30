import * as React from "react";
import { type DateRange } from "react-day-picker";

import { PageHeader } from "@/components/ui/page-header";
import ErrorAlert from "@/components/ui/error-alert";
import DashboardSiteSelector from "./dashboard.site.selector";
import { DashboardDateRangePicker } from "./dashboard.date.picker";
import DashboardStatsGrid from "./dashboard.stats.grid";
import { PageviewsCard } from "./dashboard.pageviews";

import type { DashboardPageProps } from "../dashboard.types";
import { useAction } from "@/hooks/use-action";
import { actions } from "astro:actions";
import { ReferrerChart } from "@/components/ui/donut";

const referrers = [

    { name: 'Direct', visitors: 2 },

    { name: 'Perplexity', visitors: 1 },

    { name: 'Google', visitors: 1 },

    { name: 'Brave', visitors: 1 },

    { name: 'Facebook', visitors: 1 }

]
export function DashboardPage({
    sites,
    errorMsg,
    activeSiteId,
    dateRange,
    stats,
    pageviews,
    countries,
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
            devices: [],
            trafficTrends: []
        });

    const { execute } = useAction(
        actions.dashboardActions.getOverview,
        {
            loadingMessage: "Updating analytics...",
            successMessage: "Dashboard updated",
            onSuccess: (data) => {
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
        <div className="space-y-6">
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

            {/* 
                - trafic treands 
                - trafic by platform (eg. mobile, laptop, computer, tab)
                - trafic by platform (eg. direct, linkedin facebook)
                - trafic by country
           */}
            <DashboardStatsGrid stats={dashboardData.stats} />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ReferrerChart
                    data={referrers}
                    title="Where is traffic coming from?"
                />
                <PageviewsCard
                    pageviews={dashboardData.pageviews}
                />
            </div>
        </div>
    );
}
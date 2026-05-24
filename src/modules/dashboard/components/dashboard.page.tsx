// src/components/dashboard/dashboard-page.tsx
import * as React from "react";
import { type DateRange } from "react-day-picker";
import { PageHeader } from "@/components/ui/page-header";
import ErrorAlert from "@/components/ui/error-alert";
import DashboardSiteSelector from "./dashboard.site.selector";
import { DashboardDateRangePicker } from "./dashboard.date.picker";
import DashboardStatCard from "./dashboard.stats";
import type { DashboardPageProps } from "../dashboard.types";


export function DashboardPage({ sites, errorMsg, defaultSiteId, dateRange, dashboardStats }: DashboardPageProps) {
    const [siteId, setSiteId] = React.useState<string>(defaultSiteId || "");
    const [date, setDate] = React.useState<DateRange | undefined>(dateRange);

    return (
        <div className="space-y-6">
            <ErrorAlert errorMsg={errorMsg} />
            <PageHeader
                title="Overview"
                description="Welcome back. Here's what's happening today."
            >
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full">

                    <DashboardSiteSelector
                        selectedSiteId={siteId}
                        onSiteChange={(e) => setSiteId(e)}
                        sites={sites}
                    />

                    <DashboardDateRangePicker
                        date={date}
                        onDateChange={setDate}
                    />
                </div>
            </PageHeader>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.isArray(dashboardStats) ? (
                    dashboardStats.map((stat) => (
                        <DashboardStatCard key={stat.name} {...stat} />
                    ))
                ) : (
                    <p className="text-sm text-muted-foreground col-span-full">
                        Metrics array is temporarily unavailable.
                    </p>
                )}
            </div>
        </div>
    );
}
// src/components/dashboard/dashboard-page.tsx
import * as React from "react";
import { type DateRange } from "react-day-picker";
import { PageHeader } from "@/components/ui/page-header";
import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import StatCard from "../../modules/dashboard/components/dashboard-stats";
import { subMonths, parseISO, format } from 'date-fns';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import type { Site } from "@/db/schema/site"; // Import your type definition
import { TriangleAlert } from "lucide-react";
import ErrorAlert from "../ui/error-alart";
const stats = [

  {

    label: "Total Traffic",

    name: "totalTraffic",

    value: 14250,

    change: 12.4, // Up by 12.4%

  },

  {

    label: "Bounce Rate",

    name: "bounceRate",

    value: 42.15,

    change: 4.2, // Up by 4.2% (Will correctly display as a negative red trend)

  },

  {

    label: "Avg Session Duration",

    name: "avgSessionDuration",

    value: 168, // 2m 48s

    change: -8.5, // Down by 8.5%

  },

  {

    label: "Conversion Rate",

    name: "conversionRate",

    value: 3.64,

    change: 24.1, // Up by 24.1%

  },

];

interface DashboardPageProps {
  initialSites: Site[];
  errorMsg?: string | null;
}

const formatDateParam = (date: Date | undefined) => date ? format(date, "yyyy-MM-dd") : "";

export default function DashboardPage({ initialSites, errorMsg }: DashboardPageProps) {
  // 1. Initialize site selection. Fallback to the first available site if URL is empty
  const [siteId, setSiteId] = React.useState<string>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("site") || initialSites[0]?.id || "";
    }
    return initialSites[0]?.id || "";
  });

  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const fromParam = params.get("from");
      const toParam = params.get("to");

      return {
        from: fromParam ? parseISO(fromParam) : subMonths(new Date(), 1),
        to: toParam ? parseISO(toParam) : new Date(),
      };
    }
    return { from: subMonths(new Date(), 1), to: new Date() };
  });

  // 2. Synchronize selection to window URL parameters
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);

    if (siteId) url.searchParams.set("site", siteId);

    if (date?.from) url.searchParams.set("from", formatDateParam(date.from));
    else url.searchParams.delete("from");

    if (date?.to) url.searchParams.set("to", formatDateParam(date.to));
    else url.searchParams.delete("to");

    window.history.replaceState({}, "", url.toString());

    // NOTE: This is where you would call an action or endpoint to load stats 
    // for specific values: { siteId, date }
  }, [siteId, date]);

  return (
    <div className="space-y-6">
      <ErrorAlert errorMsg={errorMsg} />
      <PageHeader
        title="Overview"
        description="Welcome back. Here's what's happening today."
      >
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 w-full">

          {/* SITE DROP-DOWN RENDER */}
          <Select value={siteId} onValueChange={setSiteId}>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a site" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>My Websites</SelectLabel>
                {initialSites.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.title}
                  </SelectItem>
                ))}
                {initialSites.length === 0 && (
                  <SelectItem value="none" disabled>No sites found</SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          <CalendarDateRangePicker date={date} onDateChange={setDate} />
        </div>
      </PageHeader>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => <StatCard key={stat.name} {...stat} />)}
      </div>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  MousePointer2,
  TrendingUp,
  Globe,
<<<<<<< Updated upstream
  Plus
=======
  FilterIcon
>>>>>>> Stashed changes
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {

  const websites = [
    { id: "site-1", name: "Success Coaching", url: "success-coaching.com" },
    { id: "site-2", name: "IELTS Mastery", url: "ielts-mastery.bd" },
    { id: "site-3", name: "Python Academy", url: "py-academy.com" },
  ];
  // Dummy data representing aggregated stats from your Drizzle queries
  const stats = [
    { name: "Total Leads", value: "2,543", icon: Users, change: "+12.5%", color: "text-blue-500" },
    { name: "Link Clicks", value: "18,201", icon: MousePointer2, iconColor: "text-emerald-500", change: "+4.3%", color: "text-emerald-500" },
    { name: "Conv. Rate", value: "14.2%", icon: TrendingUp, change: "+2.1%", color: "text-orange-500" },
    { name: "Active Sites", value: "3", icon: Globe, change: "0%", color: "text-purple-500" },
  ];

  const recentConversions = [
    { name: "Rahat Islam", source: "Facebook Summer Sale", time: "12 mins ago", status: "New Lead" },
    { name: "Nabila Ahmed", source: "Google Search", time: "45 mins ago", status: "Enrolled" },
    { name: "Samiul Haque", source: "Direct Link", time: "2 hours ago", status: "New Lead" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Overview
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Welcome back. Here&aps;s what&aps;s happening today.
          </p>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* On tiny screens, we might want to make buttons full width or icon-only */}
          <Button
            variant="outline"
            className="flex-1 sm:flex-none text-xs md:text-sm"
          >
            Download <span className="hidden xs:inline ml-1">Report</span>
          </Button>

          <Button
            className="flex-1 sm:flex-none gap-2 text-xs md:text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create UTM</span>
          </Button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-white/10 bg-background/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs mt-1 ${stat.color} font-medium`}>
                {stat.change} <span className="text-muted-foreground">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART PLACEHOLDER (The "Senior" Look) */}
        <Card className="lg:col-span-2 border-white/10 bg-background/50">
          <CardHeader>
            <CardTitle>Traffic Attribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-75 w-full bg-primary/5 rounded-lg border border-dashed border-primary/20 flex flex-col items-center justify-center text-muted-foreground">
              {/* <BarChart3 className="w-10 h-10 mb-2 opacity-20" /> */}
              <p className="text-sm italic">Analytics Visualization goes here (Chart.js / Recharts)</p>
            </div>
          </CardContent>
        </Card>

        {/* RECENT ACTIVITY FEED */}
        <Card className="border-white/10 bg-background/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Conversions</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs h-8">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentConversions.map((conv, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {conv.name[0]}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{conv.name}</p>
                    <p className="text-xs text-muted-foreground">{conv.source}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase">{conv.time}</p>
                    <Badge variant="outline" className="text-[9px] px-1 h-4">{conv.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
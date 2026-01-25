import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Plus, Code2, BarChart3, MoreVertical, CheckCircle2, AlertCircle } from "lucide-react";

export default function MyWebsites() {
  // Dummy data representing tracked sites from your Drizzle DB
  const websites = [
    {
      id: "1",
      url: "https://success-coaching.com",
      status: "active",
      totalVisits: "12,450",
      avgDaily: "450",
      lastPing: "2 mins ago",
    },
    {
      id: "2",
      url: "https://ielts-mastery.bd",
      status: "inactive",
      totalVisits: "0",
      avgDaily: "0",
      lastPing: "Never",
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row gap-3 justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Websites</h1>
          <p className="text-muted-foreground">Track and manage your websites.</p>
        </div>
        <Button className="gap-2 w-full md:w-auto">
          <Plus className="w-4 h-4" /> Add New Site
        </Button>
      </div>

      <div className="grid gap-6">
        {websites.map((site) => (
          <Card key={site.id} className="border-white/10 bg-background/50 overflow-hidden">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{site.url}</h3>
                    {site.status === "active" ? (
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Live
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-amber-500/20 gap-1">
                        <AlertCircle className="w-3 h-3" /> No Data
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Last activity: {site.lastPing}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 px-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Visits</p>
                  <p className="text-xl font-bold">{site.totalVisits}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Daily Avg</p>
                  <p className="text-xl font-bold text-primary">{site.avgDaily}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Code2 className="w-4 h-4" /> Get Script
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <BarChart3 className="w-4 h-4" /> View Report
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Senior Touch: A helper card for new users */}
      <Card className="border-dashed border-white/20 bg-transparent">
        <CardContent className="p-12 flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-muted rounded-full">
            <Globe className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="max-w-sm">
            <h3 className="font-semibold text-lg">Add your primary domain</h3>
            <p className="text-sm text-muted-foreground">
              We&aps;ll provide a 1KB script to paste into your site. No cookies, no bloat—just pure analytics.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
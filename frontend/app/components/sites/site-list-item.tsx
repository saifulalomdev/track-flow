import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Globe, MoreVertical, Code2, CheckCircle2, AlertCircle, BarChart3, PenIcon, Trash2 } from 'lucide-react'

interface SiteListItemProps {
    url: string;
    siteStatus: "Active" | "Close";
    lastPing: string;
    totalVisits: number;
    avgDaily: number;
    title: string
}

export default function SiteListItem({
    url = "d",
    siteStatus = "Active",
    lastPing,
    totalVisits = 2000,
    avgDaily = 250,
    title
}: SiteListItemProps) {
    return (
        <Card className="border-white/10 bg-background/50 overflow-hidden">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <div>
                                <h3 className="font-bold text-lg">{title}</h3>
                                <h3 className="text-muted-foreground">{url}</h3>
                            </div>
                            {siteStatus === "Active" ? (
                                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Live
                                </Badge>
                            ) : (
                                <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-amber-500/20 gap-1">
                                    <AlertCircle className="w-3 h-3" /> No Data
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">Last activity: {lastPing}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 px-4">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Visits</p>
                        <p className="text-xl font-bold">{totalVisits}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Daily Avg</p>
                        <p className="text-xl font-bold text-primary">{avgDaily}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Code2 className="w-4 h-4" /> Get Script
                    </Button>
                    <Button variant="outline" size="icon-sm" className="gap-2">
                        <PenIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon-sm">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}

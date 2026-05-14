import { Card } from '../ui/card'
import { Button } from '../ui/button'
import {
    AlertCircle,
    BarChart3,
    CheckCircle2,
    Code2,
    Globe,
    MoreVertical,
    Play
} from 'lucide-react'
import { Badge } from '../ui/badge'

export interface SiteCardProps {
    id: string;
    url: string;
    status?: "active" | "inactive";
    lastPing?: string;
    totalVisits?: string;
    avgDaily?: string;
};

export default function SiteCard({ id, url, status, lastPing, totalVisits, avgDaily }: SiteCardProps) {

    return (
        <Card key={id} className="border-white/10 bg-background/50 rounded-md overflow-hidden">
            <div className="p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg">{url}</h3>
                            {status === "active" ? (
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

                <div className="flex gap-4 px-4">
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
                    <Button variant="outline" className="gap-2">
                        <Code2 className="w-4 h-4" /> Copy Script
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Play className="w-4 h-4" /> Test
                    </Button>
                    <Button variant="outline" size="icon">
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </Card>
    )
}

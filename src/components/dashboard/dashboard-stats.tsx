import { Target, Timer, Undo, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface StatsProps {
    name?: "conversionRate" | "avgSessionDuration" | "bounceRate" | "totalTraffic",
    value?: number,
    change?: number,
    label?: string
}

export default function StatCard({ name, value, change = 0, label }: StatsProps) {
    return (
        <Card key={name} className="border-white/10 bg-background/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {label}
                </CardTitle>
                {name === "avgSessionDuration" && <Timer size={20} />}
                {name === "totalTraffic" && <Users size={20} />}
                {name === "conversionRate" && <Target size={20} />}
                {name === "bounceRate" && <Undo className='rotate-180' size={20} />}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value ? value : "--"}</div>
                <p className={`text-xs mt-1 font-medium ${change > 0 ? "text-green-400" : "text-red-400"}`}>
                    {change} % <span className="text-muted-foreground">from last month</span>
                </p>
            </CardContent>
        </Card >
    )
}

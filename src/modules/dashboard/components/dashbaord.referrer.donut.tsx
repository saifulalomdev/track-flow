import * as React from "react"
import { TrendingUp, MousePointer2 } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

interface ReferrerData {
  name: string
  visitors: number
}

interface ReferrerChartProps {
  data?: ReferrerData[] // ✅ Made optional to catch undefined variants safely
  title?: string
  description?: string
}

export function ReferrerChart({ 
  data = [], 
  title = "Traffic Sources", 
  description = "Top referrers for the selected period" 
}: ReferrerChartProps) {
  
  // Edge Case 1: Avoid Recharts hydration matching errors across SSR/Client splits
  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  // 1. Generate dynamic chart config and add fill colors to data
  const { chartData, chartConfig } = React.useMemo(() => {
    const config: ChartConfig = {
      visitors: { label: "Visitors" }
    }

    // Filter out any invalid items to safeguard chart mappings
    const cleanData = data.filter(item => item && typeof item.name === "string")

    const formattedData = cleanData.map((item, index) => {
      const key = item.name.toLowerCase().replace(/\s/g, "_")
      
      config[key] = {
        label: item.name,
        color: `var(--chart-${(index % 5) + 1})`,
      }

      return {
        name: item.name,
        visitors: item.visitors || 0,
        fill: `var(--chart-${(index % 5) + 1})`,
        key
      }
    })

    return { chartData: formattedData, chartConfig: config }
  }, [data])

  // 2. Calculate total visitors
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [chartData])

  // Edge Case 2: Explicit structural handle if there is no data or no real visits
  const isEmptyState = chartData.length === 0 || totalVisitors === 0

  return (
    <Card className="flex flex-col w-full bg-transparent">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 pb-0 min-h-[250px] flex items-center justify-center">
        {!isMounted ? (
          // Avoid layout shift & hydration flicker with a simple skeleton state matching the bounding box
          <div className="w-[200px] h-[200px] rounded-full border-4 border-dashed border-muted animate-pulse mx-auto" />
        ) : isEmptyState ? (
          // Dynamic empty UI context inside the container layout
          <div className="flex flex-col items-center justify-center text-center space-y-2 p-6">
            <div className="p-3 rounded-full bg-muted/50 text-muted-foreground">
              <MousePointer2 className="h-6 w-6 stroke-[1.5]" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">No referral traffic detected</p>
            <p className="text-xs text-muted-foreground/70 max-w-[200px]">
              Links or tracking parameters haven't recorded records yet.
            </p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-xs"
                          >
                            Total Visits
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm pt-4">
        {!isEmptyState && (
          <div className="flex items-center gap-2 leading-none font-medium">
            Source diversity is high <TrendingUp className="h-4 w-4" />
          </div>
        )}
        <div className="leading-none text-muted-foreground text-center text-xs">
          Showing unique sessions per platform
        </div>
      </CardFooter>
    </Card>
  )
}
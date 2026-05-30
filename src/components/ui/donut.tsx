"use client"

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
  data: ReferrerData[]
  title?: string
  description?: string
}

export function ReferrerChart({ 
  data = [], 
  title = "Traffic Sources", 
  description = "Top referrers for the selected period" 
}: ReferrerChartProps) {
  
  // 1. Generate dynamic chart config and add fill colors to data
  const { chartData, chartConfig } = React.useMemo(() => {
    const config: ChartConfig = {
      visitors: { label: "Visitors" }
    }

    const formattedData = data.map((item, index) => {
      const key = item.name.toLowerCase().replace(/\s/g, "_")
      
      // Assign specific chart colors (var(--chart-1), etc.)
      config[key] = {
        label: item.name,
        color: `var(--chart-${(index % 5) + 1})`,
      }

      return {
        name: item.name,
        visitors: item.visitors,
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

  return (
    <Card className="flex flex-col w-full bg-transparent">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
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
                          className="fill-muted-foreground"
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Source diversity is high <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground text-center">
          Showing unique sessions per platform
        </div>
      </CardFooter>
    </Card>
  )
}
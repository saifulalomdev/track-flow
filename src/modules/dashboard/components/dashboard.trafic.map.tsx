import { Chart } from "react-google-charts";
import type { CountryItem } from "../dashboard.types";

interface TrafficMapProps {
  countries: CountryItem[];
}

export default function TrafficMap({ countries }: TrafficMapProps) {
  const mapData = [
    ["Country", "Visitors"],
    ...countries.map((c) => [c.name.toUpperCase(), c.visitors]),
  ];

  // 2. Set options to match your dark/blue brand aesthetic
  const chartOptions = {
    backgroundColor: "transparent", // Lets your backdrop-blur shine through
    datalessRegionColor: "#1e1e2e",  // Dark background color for regions with 0 visitors
    defaultColor: "#1e1e2e",
    colorAxis: { 
      colors: ["#3b82f6", "#1d4ed8"] // Auto-generates a smooth gradient from light blue to dark deep blue
    },
    legend: "none", // Keeps the map layout clean and spacious
    tooltip: { 
      textStyle: { color: "balck" }, 
      showColorCode: false 
    },
  };

  return (
    <div className="w-full border border-white/10 bg-background/50 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center overflow-hidden h-[400px]">
      <Chart
        chartType="GeoChart"
        width="100%"
        height="100%"
        data={mapData}
        options={chartOptions}
        loader={<div className="text-sm text-muted-foreground animate-pulse">Loading Map Visualizer...</div>}
      />
    </div>
  );
}
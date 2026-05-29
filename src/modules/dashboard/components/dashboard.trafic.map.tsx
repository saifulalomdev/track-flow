import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import type { CountryItem } from "../dashboard.types"

// This trusted CDN topology contains explicit ISO Alpha-2 codes ('iso_a2') for every country
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json" 
// If your file requires a direct features mapping, let's use this clean geojson asset fallback:
const fallbackGeoUrl = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson"

export default function TrafficMap({ countries }: { countries: CountryItem[] }) {
    // Standardize all codes to uppercase for flawless lookups
    const trafficMap = new Map(countries.map(c => [c.name.toUpperCase(), c.visitors]))
    
    // Find highest visitor count to properly scale color intensity
    const maxVisitors = Math.max(...countries.map(c => c.visitors), 1)

    return (
        <div className="w-full border border-white/10 bg-background/50 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center overflow-hidden">
            <ComposableMap projectionConfig={{ scale: 140 }} width={800} height={400} style={{ width: "100%", height: "100%" }}>
                <Geographies geography={fallbackGeoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => {
                            // Extract standard ISO codes safely from the Natural Earth properties layout
                            const countryCode = (
                                geo.properties?.ISO_A2 || 
                                geo.properties?.iso_a2 || 
                                geo.properties?.WB_A2
                            )?.toUpperCase();

                            const visitors = countryCode ? (trafficMap.get(countryCode) || 0) : 0;

                            return (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    // If there are visitors, apply our gorgeous primary blue brand tint
                                    fill={visitors > 0 ? `rgba(59, 130, 246, ${0.3 + (visitors / maxVisitors) * 0.7})` : "#1e1e2e"}
                                    stroke="#2e2e3f"
                                    strokeWidth={0.5}
                                    style={{
                                        default: { outline: "none", transition: "all 200ms" },
                                        hover: { fill: "#60a5fa", outline: "none", cursor: "pointer" },
                                        pressed: { outline: "none" }
                                    }}
                                />
                            )
                        })
                    }
                </Geographies>
            </ComposableMap>
        </div>
    )
}
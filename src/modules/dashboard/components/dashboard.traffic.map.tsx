import React, { useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import { colord } from 'colord';
import { Card, CardContent } from '@/components/ui/card';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export const getCountryName = (code: string) => {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code;
  } catch {
    return code;
  }
};

const ISO_COUNTRIES: Record<string, string> = {
  "050": "BD", "840": "US", "702": "SG", "356": "IN", "276": "DE",
  "076": "BR", "124": "CA", "250": "FR", "826": "GB", "036": "AU"
};

interface VisitorData {
  name: string;
  visitors: number;
}

interface DensityMapProps {
  data?: VisitorData[];
}

export default function DensityMap({ data = [] }: DensityMapProps) {
  const { dataMap, maxVisitors } = useMemo(() => {
    const resMap: Record<string, number> = {};
    let max = 1;

    data.forEach(item => {
      if (item.name) {
        const code = item.name.toUpperCase();
        resMap[code] = item.visitors;
        if (item.visitors > max) max = item.visitors;
      }
    });

    return { dataMap: resMap, maxVisitors: max };
  }, [data]);

  return (
    <Card>
      <CardContent>
        <ComposableMap projection="geoMercator">
          <ZoomableGroup zoom={1} minZoom={0.7} center={[0, 30]} filterZoomEvent={() => false}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const code = ISO_COUNTRIES[geo.id];
                  const geoName = geo.properties.name;

                  if (geoName?.toLowerCase() === "antarctica" || code === 'AQ') {
                    return null;
                  }

                  // If code matches lookup use it, otherwise fallback cleanly to asset definitions
                  const count = code ? (dataMap[code] || 0) : 0;
                  const displayLabel = code ? getCountryName(code) : (geoName || "Unknown");

                  const fillColor = count > 0
                    ? colord("#3b82f6").lighten(0.4 * (1.0 - count / maxVisitors)).toHex()
                    : "#e2e8f0";

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fillColor}
                      stroke="#ffffff"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { outline: 'none', fill: '#1d4ed8' },
                        pressed: { outline: 'none' },
                      }}
                      data-tooltip-id="world-map-tooltip"
                      data-tooltip-content={`${displayLabel}: ${count} visitors`}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <Tooltip id="world-map-tooltip" float />
      </CardContent>
    </Card>
  );
}
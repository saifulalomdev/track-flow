import { describe, it, expect, vi } from "vitest";
import type { D1Instance } from "@/lib";
import { dashboardService } from "../dashboard.service";

describe("dashboardService.getOverviewData", () => {
  it("should execute raw SQL and parse data metrics correctly", async () => {
    // 1. Arrange: Create a mock database instance mirroring Cloudflare D1 query returns
    const mockDbRun = vi.fn().mockResolvedValue({
      results: [
        {
          total_traffic: 125,
          bounce_rate: 42.5,
          avg_session_duration: 180,
        },
      ],
    });

    const mockDb = {
      run: mockDbRun,
    } as unknown as D1Instance;

    const testParams = {
      db: mockDb,
      websiteId: "site-uuid-123",
      dateFrom: "2026-01-01 00:00:00",
      dateTo: "2026-01-31 23:59:59",
    };

    // 2. Act: Run our pure service function
    const result = await dashboardService.getOverviewData(testParams);

    // 3. Assert: Validate index extraction maps parameters correctly
    expect(mockDbRun).toHaveBeenCalledTimes(1);
    expect(result.metrics).toEqual({
      totalTraffic: 125,
      bounceRate: 42.5,
      avgSessionDuration: 180,
    });
  });

  it("should safely fall back to 0 if the database returns an empty results array", async () => {
    // Arrange: Simulate an empty database table timeline match
    const mockDb = {
      run: vi.fn().mockResolvedValue({ results: [] }),
    } as unknown as D1Instance;

    // Act
    const result = await dashboardService.getOverviewData({
      db: mockDb,
      websiteId: "empty-site-id",
      dateFrom: "2026-05-01 00:00:00",
      dateTo: "2026-05-23 00:00:00",
    });

    // Assert: Ensure metrics fail gracefully into defaults instead of throwing runtime TypeErrors
    expect(result.metrics).toEqual({
      totalTraffic: 0,
      bounceRate: 0,
      avgSessionDuration: 0,
    });
  });
});

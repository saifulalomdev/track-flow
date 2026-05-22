import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getDefaultTimeRange } from "../get-default-time-range";

describe("getDefaultTimeRange() String Formatter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should generate the exact SQLite text format strings for today and the previous month", () => {
    // FIX: Instantiate the date directly using local system clock parameters
    // Year, Month Index (4 = May), Day, Hour, Minute, Second
    const mockCurrentDate = new Date(2026, 4, 23, 12, 0, 0); 
    vi.setSystemTime(mockCurrentDate);

    const result = getDefaultTimeRange();

    expect(result).toEqual({
      from: "2026-04-23 12:00:00",
      to: "2026-05-23 12:00:00",
    });
  });

  it("should output strings that strictly conform to the SQLite text comparison regex", () => {
    const result = getDefaultTimeRange();
    const sqliteDateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

    expect(result.from).toMatch(sqliteDateTimeRegex);
    expect(result.to).toMatch(sqliteDateTimeRegex);
  });
});

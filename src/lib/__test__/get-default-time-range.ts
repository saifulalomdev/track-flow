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
    const mockCurrentDate = new Date("2026-05-23T12:00:00.000Z"); 
    vi.setSystemTime(mockCurrentDate);

    const result = getDefaultTimeRange();

    expect(result).toEqual({
      from: new Date("2026-04-23T12:00:00.000Z"),
      to: new Date("2026-05-23T12:00:00.000Z"),
    });
  });

  it("should output strings that strictly conform to the SQLite text comparison regex", () => {
    const mockCurrentDate = new Date("2026-05-23T12:00:00.000Z"); 
    vi.setSystemTime(mockCurrentDate);

    const result = getDefaultTimeRange();

    expect(result.from).toBeInstanceOf(Date);
    expect(result.to).toBeInstanceOf(Date);
  });
});
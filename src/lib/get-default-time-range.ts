import { subMonths } from "date-fns";
import type { DateRange } from "react-day-picker";

/**
 * Generates the fallback date range boundary targets for dashboard analytics metrics queries.
 * By default, this establishes a trailing 30-day (1-month) window ending at the current time.
 *
 * @returns {DateRange} An object containing the absolute `from` (one month ago) and `to` (now) JavaScript Date bounds.
 *
 * @example
 * const defaultRange = getDefaultTimeRange();
 * // Returns: { from: Mon Apr 25 2026 ..., to: Mon May 25 2026 ... }
 */
export function getDefaultTimeRange(): DateRange {
    const today = new Date();
    return {
        from: subMonths(today, 1), 
        to: today
    };
}
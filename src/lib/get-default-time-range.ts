import { subMonths } from "date-fns";
import type { DateRange } from "react-day-picker";

export function getDefaultTimeRange(): DateRange {
    const today = new Date();
    return {
        from: subMonths(today, 1), 
        to: today
    };
}
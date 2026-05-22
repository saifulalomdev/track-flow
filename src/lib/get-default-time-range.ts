import { subMonths } from "date-fns";

export function getDefaultTimeRange() {
    const today = new Date();
    return {
        from: subMonths(today, 1),
        to: today
    }
}
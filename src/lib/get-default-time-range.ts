import { format, subMonths } from "date-fns";

export function getDefaultTimeRange() {
    const today = new Date();
    return {
        from: format(subMonths(today, 1), "yyyy-MM-dd HH:mm:ss"),
        to: format(today, "yyyy-MM-dd HH:mm:ss")
    };
}

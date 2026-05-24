import { format } from "date-fns";

export function formatDate(date: Date) {
    const dateFormate = "dd LLL,  yyyy";
    return format(date, dateFormate)
}
import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDate } from "@/lib/formate-date";

interface CalendarDateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
}

export function DashboardDateRangePicker({
  date,
  onDateChange,
}: CalendarDateRangePickerProps) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto justify-start text-left font-normal">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {formatDate(date.from)} - {formatDate(date.to)}
              </>
            ) : (
              formatDate(date.from)
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-2 rounded-lg" align="end">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={onDateChange}
          numberOfMonths={1}
          className="rounded-none"
        />
      </PopoverContent>
    </Popover>
  );
}
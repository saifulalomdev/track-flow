import * as React from 'react';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function CalendarDateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2026, 4, 1),
    to: new Date(),
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='w-full md:w-auto'>
          <CalendarIcon />
          {date?.from?.toDateString()}
          -
          {date?.to ? format(date.to, "LLL dd, yyyy") : <span>No date selected</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 border-2 rounded-none" align="end">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          className="rounded-none"
        />
      </PopoverContent>
    </Popover>
  )
}
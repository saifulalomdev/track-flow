"use client"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Option {
  label: string;
  value: string;
}

interface GeneralSelectorProps {
  label: string;
  placeholder?: string;
  options: Option[];
  value: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function WebsiteSelector({
  label,
  placeholder = "Select an option",
  options,
  value,
  onChange,
  className = "w-full"
}: GeneralSelectorProps) {
  return (
    <div className={`grid items-center gap-1.5 ${className}`}>
      {label && <Label className="text-sm font-medium">{label}</Label>}

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.length > 0 ? (
            options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-sm text-muted-foreground">No options found</div>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
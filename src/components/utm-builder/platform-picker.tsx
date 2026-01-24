"use client"

import { useState } from 'react'
import { cn } from "@/lib/utils" // Ensure you have this utility from shadcn
import { platforms } from "@/constants/platforms" // Your platforms list
import { Input } from '../ui/input';
import { formatSlug } from '@/lib/formate-slug';

interface PlatformPickerProps {
  onChange: (utmSource: string) => void;
}

export function PlatformPicker({ onChange }: PlatformPickerProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handlePress = (utmSource: string) => {
    setSelected(utmSource);
    if (onChange) onChange(utmSource);
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 w-full gap-4 border-2 border-input/30 p-4 rounded-md'>

      {platforms.map(({ name, Icon, utmSource, color }) => {

        const isSelected = selected === utmSource;

        return (
          <div
            key={name}
            onClick={() => handlePress(utmSource)}
            title={name}
            className={cn(
              ' flex cursor-pointer p-3 gap-3 transition-all duration-200 items-center rounded-md border-2',
              isSelected
                ? 'bg-primary/10 border-primary shadow-md'
                : 'bg-muted/50 border-transparent hover:border-primary/30 hover:bg-muted',
              name === "Other" ? "lg:col-span-2" : ""
            )}
            style={{
              borderColor: isSelected ? color : undefined
            }}
          >
            <Icon
              color={isSelected ? color : "#71717a"}
              size={32}
              className={cn("transition-colors", isSelected && "drop-shadow-sm")}
            />
            <p
              style={{ color: isSelected ? color : "#71717a" }}
              className={cn("transition-colors", isSelected && "d")}

            >
              {name}
            </p>
          </div>
        );
      })}


      {selected === "manual" && (
        <Input
          className='lg:col-span-2'
          onChange={(e) => onChange(formatSlug(e.target.value))}
        />
      )}

    </div>
  )
}
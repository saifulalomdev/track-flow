import { cn } from '@/lib/utils'
import React from 'react'

export default function Title({ children , className }: { children: React.ReactNode , className?: string}) {
    return (
        <h1 className={cn(
            "text-4xl sm:text-6x text-white md:text-7xl lg:text-[80px] font-bold leading-[1.1] tracking-tight",
            className
        )}>
            {children}
        </h1>
    )
}

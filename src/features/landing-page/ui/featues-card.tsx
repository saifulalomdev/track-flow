import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

export type FeatuersCardProps = {
    isGradiant?: boolean,
    title: string,
    description: string,
    className?:string
}

export default function FeatuersCard({ 
    title, 
    description, 
    isGradiant = false,
    className 
}: FeatuersCardProps ) {
    return (
        <div className={cn(
            'flex flex-col justify-between p-6 min-h-62.5 rounded-4xl border border-primary/40',
            isGradiant 
                ? "bg-linear-to-tl from-primary/40 via-background/50 to-muted-foreground/5" 
                : "bg-muted-foreground/5",
            className
        )}>
            <div className='flex gap-10 justify-between items-start'>
                <p className='text-[18px] text-slate-300 leading-snug'> {description}</p>
                <Button size="icon" className='rounded-full shrink-0'>
                    <ArrowUpRight />
                </Button>
            </div>
            <h3 className='text-[34px] font-bold text-white'>{title}</h3>
        </div>
    )
}

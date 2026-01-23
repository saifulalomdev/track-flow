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
            'flex flex-col justify-between p-6 md:p-8 min-h-[280px] md:min-h-62.5 rounded-3xl md:rounded-4xl border border-primary/20 hover:border-primary/50 transition-colors duration-300',
            isGradiant 
                ? "bg-linear-to-tl from-primary/20 via-background/50 to-muted-foreground/5" 
                : "bg-muted-foreground/5",
            className
        )}>
            <div className='flex gap-6 justify-between items-start'>
                <p className='text-base md:text-[18px] text-muted-foreground leading-relaxed'>
                    {description}
                </p>
                <Button size="icon" className='rounded-full shrink-0 border border-white/10 hover:bg-primary hover:text-white'>
                    <ArrowUpRight size={20} />
                </Button>
            </div>
            <h3 className='text-2xl md:text-[34px] font-bold tracking-tight'>
                {title}
            </h3>
        </div>
    )
}

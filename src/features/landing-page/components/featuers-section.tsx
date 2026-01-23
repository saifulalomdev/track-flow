import Image from 'next/image'
import FeatuersCard from '../ui/featues-card'
import { featuers } from '@/constants/features'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FeaturesSection() {
    return (
        <section className='px-6 md:px-10 lg:px-20 mt-10 md:mt-19.5 space-y-10 md:space-y-14 overflow-hidden'>
            {/* Header Section */}
            <div className='flex flex-col lg:flex-row w-full justify-between items-center gap-10'>
                <div className="text-center lg:text-left">
                    <h1 className='text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight'>
                        Designed for Growth.
                    </h1>
                    <h1 className='text-4xl md:text-5xl lg:text-[64px] lg:-mt-4 leading-tight'>
                        Driven by <span className='text-primary font-bold'> Data.</span>
                    </h1>
                    <p className='text-base md:text-[18px] text-foreground/80 mt-6 max-w-xl mx-auto lg:mx-0'>
                        Unlock the full potential of your traffic data with our high-performance tracking engine.
                        Explore new dimensions of visitor behavior.
                    </p>
                </div>
                <div className='shrink-0'>
                    <Image
                        src="/images/cube.svg"
                        alt="Analytics Data Cube"
                        width={250}
                        height={250}
                        priority
                        className="opacity-90 brightness-110 w-40 md:w-60 lg:w-[250px]"
                    />
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {featuers.map((feature, index) => (
                    <FeatuersCard
                        {...feature}
                        key={feature.title}
                        className={cn(
                            "md:col-span-1",
                            index === 0 || index === 3 ? "lg:col-span-2" : "lg:col-span-3"
                        )}
                    />
                ))}
            </div>

            {/* Quote/Mission Section */}
            <div className='max-w-4xl mx-auto flex flex-col md:flex-row gap-6 md:gap-10 items-start py-10'>
                <h3 className='text-muted-foreground text-xl md:mt-1'>
                    {new Date().getFullYear()}
                </h3>
                <p className='text-xl md:text-[27px] font-bold leading-snug'>
                    Whether you&apos;re tracking personal projects, scaling startup traffic, or managing enterprise-level campaigns, our high-performance platform is built to turn your data into insights—quickly, accurately, and intelligently.
                </p>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row justify-center items-center gap-4 pb-10'>
                <Button size="lg" className='font-bold w-full sm:w-auto'>
                    Get started <ArrowUpRight className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className='w-full sm:w-auto'>
                    Slot available
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0AC300] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0AC300]"></span>
                    </span>
                </Button>
            </div>
        </section>
    )
}


import Image from 'next/image'
import FeatuersCard from '../ui/featues-card'
import { featuers } from '@/constants/features'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'

export default function FeaturesSection() {
    return (
        <section className='px-20 mt-19.5 space-y-14'>
            <div className='flex w-full justify-between items-center'>
                <div>
                    <h1 className='text-[64px] '>Designed for Growth. </h1>
                    <h1 className='text-[64px] -mt-6'>
                        Driven by <span className='text-primary font-bold'> Data.</span>
                    </h1>
                    <p className='text-[18px] text-foreground/80'>
                        Unlock the full potential of your traffic data with our high-performance tracking engine. <br />
                        Explore new dimensions of visitor behavior.
                    </p>
                </div>
                <div className=''>
                    <Image
                        src="/images/cube.svg"
                        alt="Analytics Data Cube"
                        width={250}
                        height={250}
                        priority
                        className="opacity-90 brightness-110"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
                {featuers.map((feature, index) => (
                    <FeatuersCard
                        {...feature}
                        key={feature.title}
                        className={index === 0 || index === 3 ? "col-span-2" : "col-span-3"}
                    />
                ))}
            </div>

            <div className='max-w-2xl mx-auto flex gap-10'>
                <h3 className='text-muted-foreground mt-2'>
                    {new Date().getFullYear()}
                </h3>
                <p className='text-[27px] font-bold'>
                    Whether you&apos;re tracking personal projects, scaling startup traffic, or managing enterprise-level campaigns, our high-performance platform is built to turn your data into insights—quickly, accurately, and intelligently.
                </p>
            </div>
            <div className='flex justify-center items-center gap-4'>
                <Button size="lg" className='font-bold'>
                    Get started <ArrowUpRight />
                </Button>
                <Button size="lg" variant="outline">
                    Slot available
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            {/* The Animation Pulse */}
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0AC300] opacity-75"></span>
                            {/* The Static Dot */}
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0AC300]"></span>
                        </span>
                    </div>
                </Button>
            </div>
        </section>
    )
}

import React from 'react'
import PricingCard from '../ui/pricing-card'
import { pricingPlans } from '@/constants/pricing-plans'

export default function PricingSection() {
    return (
        <section className='mt-19.5 relative space-y-16'>
            
            {/* backgroud image and overlay for botom */}
            <img src="/images/price-section-bg.png" className='absolute -z-10 h-full object-cover opacity-40' alt="" />
            <div className='w-full h-16 absolute -bottom-20 left-0 bg-background bg-linear-to-t from-background via-background to-background/5 '/>
            
            
            <div className='bg-background/10 backdrop-blur-sm'>
                <h1 className='font-bold text-[64px] text-center leading-tight'>
                    Choose the Plan <br />That’s Right for You
                </h1>
                <p className='text-[18px] text-foreground/80 max-w-2xl text-center mt-5 mx-auto'>
                    Access core tracking essentials and over 1,000 data integrations out of the box. Upgrade to the Pro Plan to unlock high-frequency data processing, unlimited cloud storage, and a whole new level of analytical depth.
                </p>
            </div>

            <div className='flex justify-center items-center bg-background/10 backdrop-blur-sm'>
               {pricingPlans.map((plan=> (
                 <PricingCard {...plan} key={plan.planName}/>
    
               )))}
            </div>
        </section>
    )
}

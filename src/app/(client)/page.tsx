"use client"
import FAQsection from '@/features/landing-page/components/FAQ-section'
import FeaturesSection from '@/features/landing-page/components/featuers-section'
import HeroSection from '@/features/landing-page/components/hero-section'
import PricingSection from '@/features/landing-page/components/pricing-section'

export default function LandingPage() {
  return (
    <div className='overflow-x-hidden'>
      <HeroSection />
      <FeaturesSection/>
      <PricingSection/>
      <FAQsection/>
    </div>
  )
}

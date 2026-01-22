"use client"
import FeaturesSection from '@/features/landing-page/components/featuers-section'
import HeroSection from '@/features/landing-page/components/hero-section'
import PricingSection from '@/features/landing-page/components/pricing-section'

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection/>
      <PricingSection/>
    </>
  )
}

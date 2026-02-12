import HeroSection from "~/components/landing-page/hero-section";
import FeaturesSection from "~/components/landing-page/features-section";
import PricingSection from "~/components/landing-page/pricing-section";
import FAQsection from "~/components/landing-page/FAQ-section";

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
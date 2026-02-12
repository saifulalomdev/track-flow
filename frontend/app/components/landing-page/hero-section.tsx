
import { GlobeIcon, ShieldCheckIcon, ZapIcon } from "lucide-react";
import {Link} from "react-router";
import GetStarted from "./get-started-button";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section id="hero" className="w-full relative bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Background Layer: Left Image */}
      <img
        src="/images/hero-left-side.png"
        className="absolute left-0 top-0 h-full w-1/2 object-cover"
        alt=""
      />

      {/* Background Layer: Right Image */}
      <img
        src="/images/hero-right-side.png"
        className="absolute right-0 top-0 h-full w-1/2 object-cover"
        alt=""
      />

      {/* Content Layer: Centered Text */}
      <div className="flex flex-col gap-6.75 z-10 text-center px-4">

        {/* user rating card */}
        <div className="mt-30 flex w-full justify-center items-center">
          <div className="bg-black/5 dark:bg-white/5 border border-border backdrop-blur-md gap-3 px-4 py-2 rounded-full flex items-center">

            {/* Abstract Technical Icons (No Brand Logos) */}
            <div className="flex items-center">
              {/* Icon 1: The Globe (Network) */}
              <div className="h-8 w-8 rounded-full border-2 border-background bg-zinc-900 flex items-center justify-center shadow-sm">
                <GlobeIcon size={14} className="text-white" />
              </div>
              {/* Icon 2: The Bolt (Speed) */}
              <div className="-ml-3 h-8 w-8 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center shadow-sm">
                <ZapIcon size={14} className="text-yellow-500" />
              </div>
              {/* Icon 3: The Shield (Privacy) */}
              <div className="-ml-3 h-8 w-8 rounded-full border-2 border-background bg-zinc-700 flex items-center justify-center shadow-sm">
                <ShieldCheckIcon size={14} className="text-emerald-500" />
              </div>
            </div>

            <div className="flex justify-center items-center leading-tight pr-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">Active Infrastructure</span>
                <p className="text-[11px] text-muted-foreground font-medium">
                  Verified across <span className="text-foreground font-bold">330+ Centers</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6x text-white md:text-7xl lg:text-[80px] font-bold leading-[1.1] tracking-tight">
          Streamline <span className="text-primary">Tracking.</span>
          <br className="hidden sm:block" />
          Maximize Performance.
        </h1>

        {/* descriptions */}
        <p className="text-muted-foreground mt-4 text-base sm:text-lg md:text-[22px] font-normal max-w-2xl px-4 mx-auto leading-relaxed">
          Our platform tracks traffic, identifies origins, and monitors conversions through one high-performance dashboard—eliminating bloated scripts.
        </p>

        {/* action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center px-6">
          <GetStarted />
          <Link to="/#features">
            <Button
              size="lg"
              variant="outline"
              className="font-bold w-full md:w-auto"
            >
              See Details
            </Button>
          </Link>
        </div>
      </div>
      {/* reviews */}
      <div className="pt-10 md:pt-19.75 w-full">
        <div className="h-auto md:h-53.5 w-full bg-background/5 bg-linear-to-b from-background/5 via-background to-background border-t py-10 backdrop-blur-sm grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">

          {/* Clients */}
          <div className="flex justify-center items-center flex-col border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0">
            <h1 className="text-lg md:text-[23px] opacity-80">Uptime</h1>
            <h1 className="text-4xl md:text-[46px] font-bold tracking-tight">99.9%</h1>
          </div>

          {/* Projects */}
          <div className="flex justify-center items-center flex-col border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0">
            <h1 className="text-lg md:text-[23px] opacity-80">Data Centers</h1>
            <h1 className="text-4xl md:text-[46px] font-bold tracking-tight">330+</h1>
          </div>

          {/* Reviews */}
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-lg md:text-[23px] opacity-80">Montly Requests</h1>
            <h1 className="text-4xl md:text-[46px] font-bold tracking-tight"> 50M+</h1>
          </div>

        </div>
      </div>
    </section>
  )
}
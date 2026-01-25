import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { StarIcon } from "lucide-react";
import Link from "next/link";
import GetStarted from "../ui/get-started-button";

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
          <div className="bg-black/10 bg-linear-to-tr from-primary/20 via-balck to-black border border-black backdrop-blur-sm gap-3 px-3 py-2 rounded-full flex">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="-ml-2">
                <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar className="-ml-2">
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col justify-center mr-2">
              <div className="flex">
                <StarIcon size={12} fill="#ff6900" className="text-primary" />
                <StarIcon size={12} fill="#ff6900" className="text-primary" />
                <StarIcon size={12} fill="#ff6900" className="text-primary" />
                <StarIcon size={12} fill="#ff6900" className="text-primary" />
                <StarIcon size={12} fill="#ff6900" className="text-primary" />
              </div>
              <p className="text-muted-foreground">150+ happy clients</p>
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
          <Link href="/#features">
            <Button
              size="lg"
              variant="outline"
              className="font-bold sm:w-auto"
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
            <h1 className="text-lg md:text-[23px] opacity-80">Clients</h1>
            <h1 className="text-4xl md:text-[46px] font-bold tracking-tight">350+</h1>
          </div>

          {/* Projects */}
          <div className="flex justify-center items-center flex-col border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0">
            <h1 className="text-lg md:text-[23px] opacity-80">Projects</h1>
            <h1 className="text-4xl md:text-[46px] font-bold tracking-tight">1,000+</h1>
          </div>

          {/* Reviews */}
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-lg md:text-[23px] opacity-80">5 Star Review</h1>
            <h1 className="text-4xl md:text-[46px] font-bold tracking-tight">10,000+</h1>
          </div>

        </div>
      </div>
    </section>
  )
}
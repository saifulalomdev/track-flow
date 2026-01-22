import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { StarIcon } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full relative flex flex-col items-center justify-center overflow-hidden">
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
          <div className="bg-background/10 bg-linear-to-tr from-primary/20 via-background to-background border backdrop-blur-sm gap-3 p-2 rounded-full flex">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col justify-center mr-3">
              <div className="flex">
                <StarIcon size={14} fill="#ff6900" className="text-primary" />
                <StarIcon size={14} fill="#ff6900" className="text-primary" />
                <StarIcon size={14} fill="#ff6900" className="text-primary" />
                <StarIcon size={14} fill="#ff6900" className="text-primary" />
                <StarIcon size={14} fill="#ff6900" className="text-primary" />
              </div>
              <p>150+ happy clients</p>
            </div>
          </div>
        </div>

        {/* headlines */}
        <h1 className="text-6xl font-bold md:text-[80px]">
          Streamline <span className="text-primary">Tracking.</span>
          <br />
          Maximize Performance.
        </h1>

        {/* descriptions */}
        <p
          className="text-muted-foreground mt-4 text-[22px] font-normal max-w-200 mx-auto"
        >
          Our platform tracks traffic, identifies origins, and monitors conversions through one high-performance dashboard—eliminating bloated scripts.
        </p>

        {/* action buttons */}
        <div className="flex gap-5.75 justify-center">
          <Button
            size="lg"
            className="font-bold"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="font-bold"
          >
            See Details
          </Button>
        </div>

        {/* reviews */}

      </div>
      <div className="pt-19.75 w-full">
        <div className="h-53.5 w-full bg-background/5 border py-10 backdrop-blur-sm grid grid-cols-3">
          <div className="flex justify-center items-center flex-col border-r">
            <h1 className="text-[23px]">Clients</h1>
            <h1 className="text-[46px] font-bold">350+</h1>
          </div>
          <div className="flex justify-center items-center flex-col border-r">
            <h1 className="text-[23px]">Projects</h1>
            <h1 className="text-[46px] font-bold">1000+</h1>
          </div>
          <div className="flex justify-center items-center flex-col">
            <h1 className="text-[23px]">5 Star Review</h1>
            <h1 className="text-[46px] font-bold">10,000+</h1>
          </div>
        </div>
      </div>
    </section>
  )
}
import { Button } from "@/components/ui/button";

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
        <div className="mt-30">
          Profiles
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
          <Button className="font-bold">
            Get Started
          </Button>
          <Button
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
import { Button } from "@/components/ui/button"
import Separator from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ChevronRight, CircleCheck } from "lucide-react"

export type PricingCardPros = {
    planName: "Free" | "Pro" | "Team",
    shortDescription: string,
    price: string,
    discount: string,
    features: string[]
}

export default function PricingCard({ planName, shortDescription, price, features }: PricingCardPros) {
    const freePlan = planName === "Free"
    const proPlan = planName === "Pro"
    const teamPlan = planName === "Team"

    return (
        <div className={cn(
            'w-full max-w-85 z-10 xl:max-w-100 h-auto lg:h-143 bg-muted-foreground/10 p-8 flex flex-col justify-between',
            freePlan && "rounded-2xl lg:rounded-none lg:rounded-l-2xl",
            proPlan && "rounded-2xl border w-full max-w-80 xl:max-w-95 h-auto lg:h-168 border-primary/30 shadow-2xl shadow-primary/30 z-10 bg-background/50 backdrop-blur-md lg:-my-12",
            teamPlan && "rounded-2xl lg:rounded-none lg:rounded-r-2xl",
        )}>
            <div className="space-y-6">
                <h1 className={cn("text-[18px]", proPlan && "text-[32px] text-primary font-bold")}>
                    {planName}
                </h1>

                <p className="opacity-75 text-[16px] leading-relaxed">{shortDescription}</p>
                
                <div className="flex items-baseline gap-2">
                    <p className="text-[40px] font-bold">{price}</p>
                    <span className="text-[16px] opacity-75">/ month</span>
                </div>
                
                <Separator />

                <div>
                    <p className="text-[16px] font-medium opacity-90">What&apos;s included</p>
                    <ul className="mt-4 space-y-3.5">
                        {features.map(featuer => (
                            <li key={featuer} className="flex items-start gap-3 text-[15px] opacity-75">
                                <CircleCheck
                                    fill={proPlan ? "#FF541F" : "transparent"}
                                    size={20}
                                    className={cn("shrink-0 mt-0.5", proPlan ? "text-background" : "text-primary")}
                                />
                                <span>{featuer}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <Button
                size="lg"
                className={cn(
                    "w-full font-bold mt-8",
                    proPlan && "bg-primary text-white hover:bg-primary/90"
                )}
                variant={proPlan ? "default" : "outline"}
            >
                Subscribe <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    )
}
import { Button } from "@/components/ui/button"
import Separator from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CheckCheck, ChevronRight, CircleCheck } from "lucide-react"

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
            'w-100 h-143 bg-muted-foreground/10 p-8 space-y-6',
            freePlan && "rounded-l-2xl ",
            proPlan && "rounded-2xl border w-95 h-168 border-primary/30 shadow-2xl shadow-primary/30",
            teamPlan && "rounded-r-2xl",
        )}>

            <h1
                className={cn(
                    "text-[18px]",
                    proPlan && "text-[32px] text-primary font-bold",
                )}
            >
                {planName}
            </h1>

            <p className="opacity-75 text-[16px]">{shortDescription}</p>
            <div className="flex items-center gap-2">
                <p className="text-[40px] font-bold">{price}</p>
                <span className="text-[16px] opacity-75 -mt-2">/ month</span>
            </div>
            <Separator />

            <div>
                <p className="text-[16px] opacity-75">What&apos;s included</p>
                <ul className="mt-4">
                    {features.map(featuer => (
                        <li key={featuer} className="mt-3.5 flex items-center gap-3 opacity-75">
                            <CircleCheck
                                fill={proPlan ? "#FF541F" : ""}
                                size={24}
                                className={proPlan ? "text-black" : ""}
                            />
                            {featuer}
                        </li>
                    ))}
                </ul>
            </div>
            <Button
                size="lg"
                className="w-full font-bold mx-auto"
                variant="outline"
                >
                Subscribe <ChevronRight />
            </Button>
        </div>
    )
}

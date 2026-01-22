import { PricingCardPros } from "@/features/landing-page/ui/pricing-card";

export const pricingPlans: PricingCardPros[] = [
    {
        planName: "Free",
        price: "$0",
        discount: "",
        shortDescription: "Perfect for hobbyists and solo developers tracking small projects.",
        features: [
            "Up to 5,000 monthly events",
            "1 Domain integration",
            "Real-time data dashboard",
            "24-hour data retention",
            "Community support"
        ]
    },
    {
        planName: "Pro",
        price: "$29",
        discount: "Save 20% yearly",
        shortDescription: "Advanced tracking for growing startups and professional creators.",
        features: [
            "Everything in Free",
            "50,000 monthly events",
            "Unlimited domain aliases",
            "30-day data retention",
            "Custom conversion goals",
            "Priority email support",
            "API access for exports"
        ]
    },
    {
        planName: "Team",
        price: "$79",
        discount: "Save 15% yearly",
        shortDescription: "Collaborative tools for teams that need high-frequency data.",
        features: [
            "Everything in Pro",
            "500,000 monthly events",
            "Shared team workspaces",
            "Granular permission control",
            "Extended 1-year retention"
        ]
    }
];
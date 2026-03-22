import type { SiteCardProps } from "@/components/sites/site-card";

export const websites : SiteCardProps[] = [
    {
        id: "1",
        url: "https://success-coaching.com",
        status: "active",
        totalVisits: "12,450",
        avgDaily: "450",
        lastPing: "2 mins ago",
    },
    {
        id: "2",
        url: "https://ielts-mastery.bd",
        status: "inactive",
        totalVisits: "0",
        avgDaily: "0",
        lastPing: "Never",
    }
];
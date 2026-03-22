import {
    Bell,
    Menu,
    UserCircle,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";


export function DashboardHeader({ onClick, isSidebarOpen }: { onClick: () => void, isSidebarOpen: boolean }) {

    return (
        <nav className="sticky shrink-0 top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-background/60 p-4 backdrop-blur-md">
            <div className="flex items-center font-bold gap-2">
                Dashboard
            </div>

            {/* RIGHT: ACTIONS */}
            <div className="flex items-center gap-2 md:gap-4">
                <Button variant="outline" size="icon" className="relative">
                    <Bell />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
                </Button>
                <Button variant="outline" size="icon">
                    <UserCircle />
                </Button>
                <Button onClick={onClick} variant="outline" size="icon" className="lg:hidden">
                    {isSidebarOpen? <X/> : <Menu />}
                </Button>
            </div>
        </nav>
    );
}
"use client";

import { useLocation } from "react-router";
import {
    Bell,
    Search,
    Menu,
    ChevronRight,
    UserCircle
} from "lucide-react";
import { useSidebar } from "./side-bar";
import { Button } from "../ui/button";

export function DashboardHeader() {
    const { pathname } = useLocation();
    const segments = pathname.split("/").filter(Boolean);
    const { toggle } = useSidebar()

    return (
        <nav className="sticky shrink-0 top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-background/60 px-4 md:px-6 backdrop-blur-md">

            {/* LEFT: MOBILE MENU + BREADCRUMBS */}
            <div className="flex items-center gap-2">
                {/* Mobile Sidebar Trigger */}
                <div className="lg:hidden">
                    <Button onClick={toggle} variant="outline" size="icon">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                {/* Breadcrumbs (Hidden on very small screens to save space) */}
                <div className="hidden sm:flex items-center gap-2 ml-2 md:ml-0">
                    {segments.map((segment, index) => (
                        <div key={segment} className="flex items-center gap-2">
                            <span className={`text-sm font-medium capitalize ${index === segments.length - 1 ? "" : "text-muted-foreground"
                                }`}>
                                {segment}
                            </span>
                            {index < segments.length - 1 && (
                                <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT: ACTIONS */}
            <div className="flex items-center gap-2 md:gap-4">

                {/* Search - Icon only on mobile */}
                <button className="flex items-center gap-2 px-2 md:px-3 py-1.5 text-sm text-muted-foreground border border-white/10 rounded-md bg-white/5 hover:bg-white/10 transition-all">
                    <Search className="h-4 w-4" />
                    <span className="hidden md:inline">Search...</span>
                    <kbd className="hidden md:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                        ⌘K
                    </kbd>
                </button>

                <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
                </Button>

                <Button variant="ghost" className="h-8 w-8 rounded-full border border-white/10 p-0">
                    <UserCircle className="h-6 w-6" />
                </Button>
            </div>
        </nav>
    );
}
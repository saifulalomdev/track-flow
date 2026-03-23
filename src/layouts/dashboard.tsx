import "@/styles/global.css";
import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex overflow-x-hidden w-full h-dvh">
            <DashboardSidebar
                className="hidden lg:flex"
            />
            <DashboardSidebar
                className={cn(
                    "lg:hidden fixed top-0 left-0 flex pt-20 h-dvh transition-all duration-300 z-40",
                    isSidebarOpen? "opacity-100 left-0" : "opacity-0 -translate-x-full"
                )}
            />
            <div className="flex-1 overflow-y-auto">
                <DashboardHeader
                    isSidebarOpen={isSidebarOpen}
                    onClick={() => setIsSidebarOpen(p => !p)}
                />
                <main className="p-4">
                    {children}
                </main>
            </div>
        </div>
    );
}
import "@/styles/global.css";
import React, { useState } from 'react';
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex">
            <DashboardSidebar
                onClick={() => setIsSidebarOpen(p => !p)}
                className="hidden md:flex"
            />
            <DashboardSidebar
                onClick={() => setIsSidebarOpen(p => !p)}
                className={cn(
                    "md:hidden fixed flex top-16 transition-all duration-300 z-40",
                    isSidebarOpen? "opacity-100 left-0" : "opacity-0 -translate-x-full"
                )}
            />
            <div className="flex-1">
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
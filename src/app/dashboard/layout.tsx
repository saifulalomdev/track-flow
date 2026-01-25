"use client";

import NavUser from '@/components/sidebar/nav-user';
import { PlanUsageStats } from '@/components/sidebar/plan-usage-stats';
import AdminSidebar from '@/components/sidebar/side-bar';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/side-bar'
import { adminNavItems } from '@/constants/admin-nav-items';
import { signOutAction } from '@/features/auth/actions/sign-out-action';
import { DashboardNavbar } from '@/features/dashboard/components/admin-header';
import { cn } from '@/lib/utils';
import { useSession } from '@/providers/session-provider';
import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    const {user} = useSession()

    return (
        <SidebarProvider >
            <AdminSidebar/>
            <SidebarInset>
                {/* <AdminHeader /> */}
                <DashboardNavbar/>
                <div className='p-4 lg:p-6'>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

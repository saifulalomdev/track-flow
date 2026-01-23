"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/side-bar'
import AdminHeader from '@/features/dashboard/components/admin-header';
import { LayoutDashboard, Settings, Users } from 'lucide-react';
import React from 'react'

const MENU_ITEMS = [
    { label: "Dashboard", href: "/admin", Icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", Icon: Users },
    { label: "Settings", href: "/admin/settings", Icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider >
            <Sidebar>
                <SidebarHeader />
                <SidebarContent sidebarItems={MENU_ITEMS} />
                <SidebarFooter />
            </Sidebar>
            <SidebarInset>
                <AdminHeader />
                <div className='p-4'>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

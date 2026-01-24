"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/side-bar'
import { adminNavItems } from '@/constants/admin-nav-items';
import AdminHeader from '@/features/dashboard/components/admin-header';
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider >
            <Sidebar>
                <SidebarHeader />
                <SidebarContent sidebarItems={adminNavItems} />
                <SidebarFooter />
            </Sidebar>
            <SidebarInset>
                <AdminHeader />
                <div className='p-4 lg:p-10'>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

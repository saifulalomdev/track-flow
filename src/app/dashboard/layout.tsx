"use client";

import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/side-bar'
import { adminNavItems } from '@/constants/admin-nav-items';
import { signOutAction } from '@/features/auth/actions/sign-out-action';
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider >
            <Sidebar>
                <SidebarHeader />
                <SidebarContent sidebarItems={adminNavItems} />
                <SidebarFooter>
                    <Button  onClick={signOutAction} className='w-full' variant="destructive">
                        Sign out
                    </Button>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                {/* <AdminHeader /> */}
                <div className='p-4 lg:p-10'>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

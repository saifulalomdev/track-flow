"use client";

import AdminSidebar from '@/components/sidebar/side-bar';
import {  SidebarInset, SidebarProvider } from '@/components/ui/side-bar'
import { DashboardNavbar } from '@/features/dashboard/components/admin-header';

import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <SidebarProvider >
            <AdminSidebar/>
            <SidebarInset>
                <DashboardNavbar/>
                <div className='p-4 lg:p-6'>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

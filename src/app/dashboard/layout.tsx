"use client";

import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/side-bar'
import { adminNavItems } from '@/constants/admin-nav-items';
import { signOutAction } from '@/features/auth/actions/sign-out-action';
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
            <Sidebar>
                <SidebarHeader>
                    <div className="w-full">
                        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-white/5 border border-white/10">
                            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center font-bold text-black">
                                {user?.name.split("")[0]}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-semibold truncate text-white">{user?.name}</p>
                                <p className="text-[10px] text-muted-foreground uppercase">Pro Account</p>
                            </div>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarContent sidebarItems={adminNavItems} />
                <SidebarFooter>
                    <div className="mt-auto p-4 border-t border-white/10 space-y-4">
                        {/* Subscription Quick View */}
                        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-bold text-primary uppercase">Usage</span>
                                <span className="text-[10px] text-muted-foreground">85%</span>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[85%] rounded-full" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <Link
                                href="/dashboard/settings"
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-white/5 hover:text-white transition-all",
                                    pathname === "/dashboard/settings" && "bg-white/5 text-white"
                                )}
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </Link>
                            <Button onClick={signOutAction} variant="ghost" className='w-full flex justify-start text-destructive hover:bg-destructive'>
                                <LogOut className="h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                {/* <AdminHeader /> */}
                <div className='p-4 lg:p-6'>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

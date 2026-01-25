"use client"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '../ui/side-bar'
import NavUser from './nav-user'
import { adminNavItems } from '@/constants/admin-nav-items'
import { PlanUsageStats } from './plan-usage-stats'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { LogOut, Settings } from 'lucide-react'
import { Button } from '../ui/button'
import { signOutAction } from '@/features/auth/actions/sign-out-action'
import { usePathname } from 'next/navigation'

export default function AdminSidebar() {
    const pathname = usePathname()
    return (
        <Sidebar>
            <SidebarHeader>
                <NavUser />
            </SidebarHeader>
            <SidebarContent sidebarItems={adminNavItems} />
            <SidebarFooter>
                <div className="mt-auto p-4 border-t border-white/10 space-y-4">
                    {/* Subscription Quick View */}
                    <PlanUsageStats current={10} limit={100} label='Usage' />

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
    )
}

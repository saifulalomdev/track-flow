import { LogOut, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { PlanUsageStats } from './plan-usage-stats';
import SidebarUser from './sidebar-user';
import { cn } from '@/lib/utils';

interface DashboardSidebarProps {
    onClick: () => void;
    className?: string
}

export default function DashboardSidebar({ className }: DashboardSidebarProps) {
    return (
        <aside className={cn('w-full overflow-y-auto md:w-60 lg:w-75 p-4 border-r h-screen flex flex-col justify-between', className)}>
            <div>
                {/* sidebar header */}
                <SidebarUser />

                {/* sidebar navigations */}
                <nav className='mt-10'>
                    Nav links
                </nav>
            </div>

            {/* sidebar footer */}
            <div className='space-y-4'>
                <PlanUsageStats
                    current={100}
                    limit={200}
                    label='Usage'
                />
                <a
                    href="/dashboard/settings"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-white/5 hover:text-white transition-all",
                        // pathname === "/dashboard/settings" && "bg-white/5 text-white"
                    )}
                >
                    <Settings className="h-4 w-4" />
                    Settings
                </a>
                <Button variant="ghost" className='w-full flex justify-start text-destructive hover:bg-destructive'>
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </aside>
    )
}

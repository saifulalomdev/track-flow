import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import SidebarUser from './sidebar-user';
import { LogOut, Settings } from 'lucide-react';
import { PlanUsageStats } from './plan-usage-stats';
import { adminNavItems } from '@/constants/admin-nav-items';
import { useAction } from '@/hooks/use-action';
import { actions } from 'astro:actions';
import { Spinner } from '../ui/spinner';

interface DashboardSidebarProps {
    className?: string
}

export default function DashboardSidebar({ className }: DashboardSidebarProps) {

    const { execute, isLoading } = useAction(actions.signOut, {
        onSuccess: (data) => {
            window.location.href = "/dashboard";
        },
    })
    return (
        <aside className={cn('w-full overflow-y-auto md:w-60 lg:w-75 p-4 border-r h-dvh bg-background flex flex-col justify-between z-30', className)}>
            <div>
                {/* sidebar header */}
                <SidebarUser />

                {/* sidebar navigations */}
                <nav className='mt-4 space-y-4'>
                    {adminNavItems.map(({ href, name, Icon }) => (
                        <a
                            key={href}
                            href={href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                                "hover:bg-accent hover:text-accent-foreground",
                            )}
                        >
                            {/* Render Icon with consistent sizing */}
                            <Icon className="h-5 w-5 shrink-0" />
                            <span className="text-sm">{name}</span>
                        </a>
                    ))}
                </nav>
            </div>

            {/* sidebar footer */}
            <div className='space-y-4 border-t pt-4'>
                <PlanUsageStats
                    current={100}
                    limit={200}
                    label='Usage'
                />
                <a
                    href="/dashboard/settings"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                    )}
                >
                    <Settings className="h-4 w-4" />
                    Settings
                </a>
                <Button disabled={isLoading} onClick={async () => await execute()} variant="ghost"
                    className={cn(
                        "flex items-center w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors",
                        "hover:bg-destructive text-destructive",
                    )}
                >
                    <LogOut className="h-4 w-4" />
                    {isLoading ? <Spinner /> : "Sign out"}
                </Button>
            </div>
        </aside>
    )
}

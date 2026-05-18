import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import SidebarBranding from './sidebar-branding';
import { LogOut, Settings } from 'lucide-react';
import { adminNavItems } from '@/constants/admin-nav-items';
import { Spinner } from '../ui/spinner';
import { useLogOut } from '@/hooks/use-log-out';

interface DashboardSidebarProps {
    className?: string
}

export default function DashboardSidebar({ className }: DashboardSidebarProps) {
    const { isLoading, logOut } = useLogOut()

    return (
        <aside className={cn('w-full overflow-y-auto md:w-60 lg:w-75 p-4 border-r h-dvh bg-background flex flex-col justify-between z-30', className)}>
            <div>
                {/* sidebar header */}
                <SidebarBranding className="border-2" />

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
            <Button disabled={isLoading} onClick={logOut} variant="ghost"
                className={cn(
                    "flex items-center w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors",
                    "hover:bg-destructive text-destructive",
                )}
            >
                <LogOut className="h-4 w-4" />
                {isLoading ? <Spinner /> : "Logout"}
            </Button>
        </aside>
    )
}

"use client"
import { useSidebar } from '@/components/ui/side-bar'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { MenuIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

const pathnameTable: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/utm": "TrackFlow Magic Link", // Much cleaner and brand-aligned
    "/admin/websites": "My Websites",
    "/admin/settings": "Settings",
}

export default function AdminHeader() {
    const { toggle } = useSidebar();
    const pathname = usePathname();

    // Fallback title if the path isn't in the table
    const displayTitle = pathnameTable[pathname] || "TrackFlow";

    return (
        <header className='w-full bg-background/10 flex justify-between items-center px-4 backdrop-blur-sm border-b h-16'>
            <div className='flex items-center gap-4'>
                <MenuIcon className='lg:hidden cursor-pointer' onClick={toggle} />
                <h1 className='text-xl font-bold tracking-tight'>
                    {displayTitle}
                </h1>
            </div>
            <SignedIn>
                <div className="flex items-center gap-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </SignedIn>
        </header>
    )
}
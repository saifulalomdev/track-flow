"use client"
import { useSidebar } from '@/components/ui/side-bar'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { MenuIcon } from 'lucide-react'

export default function AdminHeader() {
    const { toggle } = useSidebar()
    return (
        <header className='w-full bg-background/10 flex justify-between items-center px-4 backdrop-blur-sm border-b h-16'>
            <MenuIcon className='lg:hidden' onClick={toggle} />
            <input/>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header>
    )
}

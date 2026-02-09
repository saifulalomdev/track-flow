import ClientHeader from '@/features/layout/client-header'
import React from 'react'

export default function CleintLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ClientHeader />
            <main>
                {children}
            </main>
        </>
    )
}
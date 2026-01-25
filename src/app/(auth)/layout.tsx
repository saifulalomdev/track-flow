import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className='grid w-full h-dvh place-items-center'>
            {children}
        </main>
    )
}

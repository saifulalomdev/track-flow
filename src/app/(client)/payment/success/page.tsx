import { stripe } from '@/lib/stripe';
import React from 'react'

export default async function PaymentSuccess({ searchParams }: { searchParams: { session_id: string } }) {

    const { session_id } = await searchParams;
    const { metadata } = await stripe.checkout.sessions.retrieve(session_id);
    console.log(metadata)

    return (
        <div className='w-full h-[calc(100dvh-4rem)] flex justify-center items-center'>
            payme
        </div>
    )
}

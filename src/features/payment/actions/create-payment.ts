'use server';

import { ENV } from '@/config/env';
import { plans } from '@/constants/pricing-plans';
import { getSession } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';


export async function createCustomCheckout(productId: string) {
    // 1. Find the specific plan (using .find is cleaner than .filter for single items)
    const plan = plans.find((p) => p.id === productId);

    const user = await getSession();

    if (!user) {
        const params = new URLSearchParams({ redirect: "/#pricing" });
        redirect(`/sign-in?${params.toString()}`);
    }

    // 2. Security Check: Ensure plan exists and isn't the free tier (Stripe doesn't handle $0 checkouts)
    if (!plan || plan.price === 0) {
        redirect('/pricing?error=invalid_plan');
    }

    // 3. Create the Stripe Session
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    unit_amount: plan.price * 100,
                    product_data: {
                        name: `${plan.name} Plan`,
                        description: plan.desc,
                    },
                    recurring: { interval: "month" }
                },
                quantity: 1,
            }
        ],
        mode: 'subscription',
        success_url: `${ENV.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${ENV.NEXT_PUBLIC_BASE_URL}/#pricing`,

        metadata: {
            planId: plan.id,
            userId: user.id ?? "",
            userEmail: user.email,
            userName: user.name,
        }
    });

    // 4. Redirect the user to Stripe's hosted checkout
    redirect(session.url!);
}
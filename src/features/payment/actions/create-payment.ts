'use server';

import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { plans } from '@/constants/pricing-plans';
import { paymentService } from '../services/payment-service';

export async function createCheckout(productId: string) {
    const user = await getSession();
    
    if (!user || !user.id) {
        const params = new URLSearchParams({ redirect: "/#pricing" });
        return redirect(`/sign-in?${params.toString()}`);
    }

    const plan = plans.find((p) => p.id === productId);
    if (!plan) return redirect('/#pricing?error=invalid_plan');

    // 2. Prepare a variable for the target URL
    let targetUrl: string;

    try {
        if (plan.price === 0) {
            await paymentService.activateFreePlan(user.id, plan.id);
            targetUrl = '/dashboard?status=success&plan=free';
        } else {
            const session = await paymentService.createCheckoutSession({
                planId: plan.id,
                userId: user.id,
                userEmail: user.email!,
                userName: user.name!,
            });

            if (!session.url) throw new Error('stripe_session_failed');
            targetUrl = session.url;
        }
    } catch (error) {
        console.error('[PAYMENT_DATABASE_ERROR]:', error);
        targetUrl = `/#pricing?error=process_failed`;
    }

    // 3. Perform the redirect at the very end
    return redirect(targetUrl);
}
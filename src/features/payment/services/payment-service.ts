import { stripe } from '@/lib/stripe';
import { ENV } from '@/config/env';
import { plans } from '@/constants/pricing-plans';
import { db } from '@/db';
import { subscriptions } from '@/db/schema/subscriptions';

type PaymentRequest = {
    planId: string;
    userId: string;
    userEmail: string;
    userName: string;
}

export const paymentService = {
    /**
     * Handles paid subscriptions via Stripe Checkout
     */
    async createCheckoutSession({ planId, userId, userEmail, userName }: PaymentRequest) {
        const plan = plans.find((p) => p.id === planId);

        if (!plan) throw new Error('invalid_plan');
        if (plan.price === 0) throw new Error('use_internal_activation_for_free_tier');

        return await stripe.checkout.sessions.create({
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
            cancel_url: `${ENV.NEXT_PUBLIC_BASE_URL}/payment/failed?seesion_id={CHECKOUT_SESSION_ID}`,
            metadata: { planId, userId, userEmail, userName }
        });
    },

    /**
     * Handles $0 plans by activating them directly in the database
     */
    async activateFreePlan(userId: string, planId: string) {
        return await db.insert(subscriptions).values({
            userId,
            planId,
            status: 'active',
            startDate: new Date(),
        }).onConflictDoUpdate({
            target: [subscriptions.userId],
            set: { 
                planId, 
                status: 'active',
                updatedAt: new Date() 
            }
        });
    }
};
import { stripe } from '@/lib/stripe';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function PaymentSuccess({ searchParams }: { searchParams: Promise<{ session_id: string }> }) {
    const { session_id } = await searchParams;
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const metadata = session.metadata;

    if (!session) return <div className="p-20 text-center">Invalid Session</div>;

    return (
        // py-20 ensures it clears your header comfortably
        <div className='w-full flex flex-col items-center justify-center h-dvh px-4'>
            <div className="max-w-md w-full bg-primary/5 mt-10 border border-primary/10 p-8 rounded-2xl text-center shadow-sm">
                
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6 animate-in zoom-in duration-500" />

                <h1 className="text-3xl font-bold tracking-tight mb-2">Success!</h1>
                
                <p className="text-muted-foreground mb-8">
                    You are now on the <span className="text-primary font-bold uppercase">{metadata?.planId}</span> plan.
                </p>

                <div className="bg-background/50 border border-primary/10 rounded-xl p-4 mb-8 text-sm flex items-center justify-center gap-2">
                    <span className="text-muted-foreground">Account:</span>
                    <span className="font-medium">{metadata?.userEmail}</span>
                </div>

                <Button asChild className="w-full">
                    <Link href="/dashboard">
                        Go to Dashboard
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </Button>

                <p className="mt-6 text-[11px] text-muted-foreground">
                    Features will unlock automatically within a few seconds.
                </p>
            </div>
        </div>
    );
}
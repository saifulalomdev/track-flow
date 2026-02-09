import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PaymentError() {
   
    return (
        // py-20 ensures it clears your header comfortably
        <div className='w-full flex flex-col items-center justify-center px-4'>
            <div className="max-w-md w-full mt-24 bg-destructive/5 border border-destructive/10 p-8 rounded-2xl text-center shadow-sm">

                <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-6 animate-pulse" />

                <h1 className="text-3xl font-bold tracking-tight mb-2">Payment Failed</h1>

                <p className="text-muted-foreground mb-8">
                    Your transaction could not be processed. No funds were withdrawn from your account.
                </p>

                <div className="flex flex-col gap-3">
                    <Button size="lg" asChild variant="destructive">
                        <Link href="/#pricing">
                            <RefreshCw className="mr-2 w-5 h-5" />
                            Try Again
                        </Link>
                    </Button>

                    <Button asChild size="lg" variant="ghost">
                        <Link href="/dashboard">
                            <ArrowLeft className="mr-2 w-4 h-4" />
                            Return to Dashboard
                        </Link>
                    </Button>
                </div>

                <p className="mt-8 text-[11px] text-muted-foreground">
                    If this persists, please contact your bank or our support team.
                </p>
            </div>
        </div>
    );
}
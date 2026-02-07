"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import { useSignIn } from "@/features/auth/hooks/use-signin"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

export default function SignIn() {

    return (
        <Suspense>
            <SignInForm />
        </Suspense>
    )

}


function SignInForm() {
    const redirectUrl = useSearchParams().get("redirect") || "/dashboard";
    // const { form, handleSignIn, isSubmiting } = useSignIn({ redirectUrl: redirectUrl });

    return (
        <div className="space-y-4 w-sm border border-primary/30 bg-linear-to-br from-primary/10 via-primary/5 to-background p-6 rounded-md">
            <div className="flex gap-3 items-center">
                <Link href="/">
                    <ArrowLeft size={40} />
                </Link>
                <h1 className="text-4xl md:text-[46px] font-bold tracking-tight">
                    Sign in
                </h1>
            </div>

            <h1 className="text-lg mt-4 leading-relaxed max-w-md">
                Dont&apos;t have an acount?
                <Link href="/sign-up" className="text-primary ml-2 hover:underline underline-offset-3">
                    Sign up
                </Link>
            </h1>


            {/* <Form> */}
                <FormField
                    
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="jon@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="******" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            {/* </Form> */}

            <Button
                size="lg"
                // disabled={isSubmiting}
                // onClick={handleSignIn}
                className="w-full"
            >
                Sign in
            </Button>
        </div>
    )
}

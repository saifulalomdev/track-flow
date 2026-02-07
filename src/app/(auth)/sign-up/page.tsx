"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSignUp } from "@/features/auth/hooks/use-signup"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SignUp() {
    const { form, handleSignUp, isSubmiting } = useSignUp();
    return (
        <div className="space-y-4 w-sm border border-primary/30 bg-linear-to-br from-primary/10 via-primary/5 to-background p-6 rounded-md">
            <div className="flex gap-3 items-center">
                <Link href="/">
                    <ArrowLeft size={40} />
                </Link>
                <h1 className="text-4xl md:text-[46px] font-bold tracking-tight">
                    Sign up
                </h1>
            </div>

            <h1 className="text-lg mt-4 leading-relaxed max-w-md">
                Already have an acount?
                <Link href="/sign-in" className="text-primary ml-2 hover:underline underline-offset-3">
                    Sign in
                </Link>
            </h1>


            <Form {...form}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Jon Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="jon@exampl.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
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
            </Form>

            <Button
                size="lg"
                disabled={isSubmiting}
                onClick={handleSignUp}
                className="w-full"
            >
                Sign in
            </Button>
        </div>
    )
}

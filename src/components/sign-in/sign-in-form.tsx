import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Spinner } from "../ui/spinner"
import useSignIn from "@/hooks/use-sign-in"

export default function SignInForm() {
    const { form, onSubmit, isPending } = useSignIn()

    return (
        <Form {...form}>
            <Toaster />
            {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4 max-w-sm w-full">
                <h1 className="text-3xl text-center">Sign In</h1>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="name@domain.com"
                                    disabled={isPending}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full font-bold" disabled={isPending}>
                    {isPending ? <Spinner /> : "Sign in"}
                </Button>
                <p className="text-center">
                    Don’t have an account?
                    <a
                        href="/sign-up"
                        className="ml-2 text-primary underline underline-offset-3"
                    >
                         Sign up
                    </a>
                </p>
            </form> */}

           
        </Form>
    )
}
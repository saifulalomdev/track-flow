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
import useSignUp from "@/hooks/use-sign-up"
import { Spinner } from "../ui/spinner"

export default function SignUpForm() {
    const { form, onSubmit, isPending } = useSignUp()

    return (
        <Form {...form}>
            <Toaster />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4 max-w-sm w-full">
                <h1 className="text-3xl text-center">Sign up</h1>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Jon Doe"
                                    disabled={isPending}
                                    {...field}
                                />
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
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
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
                    {isPending ? <Spinner /> : "Sign up"}
                </Button>
                <p className="text-center">
                    Already have an account?
                    <a
                        href="/sign-in"
                        className="ml-2 text-primary underline underline-offset-3"
                    >
                        Sign in
                    </a>
                </p>
            </form>
        </Form>
    )
}
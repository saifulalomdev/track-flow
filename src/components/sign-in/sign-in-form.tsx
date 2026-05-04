import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { Form } from "@/components/ui/form"
import { Spinner } from "../ui/spinner"
import useSignIn from "@/hooks/use-sign-in"
import { signinFields } from "@/constants/signin-fields"
import { FormInput } from "../ui/form-input"

export default function SignInForm() {
    const { form, onSubmit, isPending } = useSignIn()

    return (
        <Form {...form}>
            <Toaster />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4 max-w-sm w-full">
                <h1 className="text-3xl text-center">Sign In</h1>
                {signinFields.map((field) => (
                    <FormInput
                        key={field.name}
                        control={form.control}
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        type={field.type}
                        disabled={isPending}
                    />
                ))}
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
            </form>
        </Form>
    )
}
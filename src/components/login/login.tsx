import { logInFields } from "@/config/login-fields";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "../ui/form-input";
import useLogIn from "@/hooks/use-log-in";
import { Spinner } from "../ui/spinner";

export default function LogInForm() {
    const { form, isPending, onSubmit } = useLogIn();

    return (
        <Form {...form}>
            <Toaster />
            <form onSubmit={form.handleSubmit(onSubmit)} method="POST" className="space-y-6 px-4 max-w-sm w-full">
                <h1 className="text-3xl text-center">Admin log in</h1>
                {logInFields.map((field) => (
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
                    {isPending ? <Spinner /> : "Log in"}
                </Button>
            </form>
        </Form>
    )
}
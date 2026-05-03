import { signupSchema, type SignupInput } from "@/db/user";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function useSignUp() {

    const [isPending, setIsPending] = useState(false);

    const form = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    async function onSubmit(values: SignupInput) {
        setIsPending(true);

        try {
            const { data, error } = await authClient.signUp.email({
                email: values.email,
                password: values.password,
                name: values.name,
            });

            if (error) {
                toast.error(error.message || "Signup failed");
                return;
            }

            toast.success("Account created successfully!");

            form.reset();

            setTimeout(() => {
                window.location.href = "/sign-in";
            }, 1500);

        } catch (err) {
            toast.error("Something went wrong!");
        } finally {
            setIsPending(false);
        }
    }

    return { form, onSubmit, isPending }
}

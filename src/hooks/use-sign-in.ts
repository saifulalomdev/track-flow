import { signinSchema, type SigninInput } from "@/db/user";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function useSignIn() {

    const [isPending, setIsPending] = useState(false);

    const form = useForm<SigninInput>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit({ email }: SigninInput) {
        setIsPending(true);

        try {
            const { data, error } = await authClient.signIn.magicLink({
                email: email,
                callbackURL: "/dashboard",
            });
            
            console.log(data)

            if (error) {
                toast.error(error.message || "Something went wrong!");
                return;
            }

            toast.success("Check your email for a login link 📩");

            form.reset();

        } catch {
            toast.error("Unexpected error occurred");
        } finally {
            setIsPending(false);
        }
    }

    return { form, onSubmit, isPending }
}

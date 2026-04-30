import { zodResolver } from "@hookform/resolvers/zod";
import { actions } from "astro:actions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function useSignIn() {

    const [isPending, setIsPending] = useState(false);

    const form = useForm<any>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: SignIn) {
        setIsPending(true);

        const { data, error } = await actions.signIn(values);

        setIsPending(false);

        if (error) {
            toast.error(error.message || "Something went wrong!")
            return;
        }

        if (data?.success) {
            toast.success(data.message || "Welcome to Trackflow!")
            form.reset();

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1500); // 1.5 seconds
        }
    }

    return { form, onSubmit, isPending }
}

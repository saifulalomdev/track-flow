import { userSchema, type User } from "@/db/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { actions } from "astro:actions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function useSignUp() {

    const [isPending, setIsPending] = useState(false);

    const form = useForm<User>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: "",
            name: ""
        },
    })

    async function onSubmit(values: User) {
        setIsPending(true);

        const { data, error } = await actions.signUp(values);

        setIsPending(false);

        if (error) {
            toast.error(error.message || "Something went wrong!")
            return;
        }

        if (data?.success) {
            toast.success(data.message || "Welcome to Trackflow!")
            form.reset();
            setTimeout(() => {
                window.location.href = "/sign-in";
            }, 1500); // 1.5 seconds
        }
    }

    return { form, onSubmit, isPending }
}

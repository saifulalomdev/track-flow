import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { signInUserSchema, type SignIn } from "@/db/schema/users";
import { useState } from "react";
import { toast } from 'sonner'
import { signInAction } from "../actions/signin-action";
import { useRouter } from "next/navigation";

const defaultValues = {
    email: "hello@saifulalom.com",
    password: "mypassword123"
}

export function useSignIn({ redirectUrl }: { redirectUrl: string }) {
    const [isSubmiting, setIsSubmiting] = useState(false);
    const { push } = useRouter()

    const form = useForm<SignIn>({
        resolver: zodResolver(signInUserSchema),
        defaultValues
    })

    // useSignIn.ts
    const handleSignIn = form.handleSubmit(async (data: SignIn) => {
        try {
            setIsSubmiting(true);
            const res = await signInAction(data);

            // Check the returned object!
            if (res?.success === false) {
                toast.error(res.message || "Invalid input");
                return; // Stop here
            }

            toast.success("Signed in successfully!");
            form.reset();
            console.log(redirectUrl)
            push(redirectUrl);
        } catch (error) {
            toast.error("A server error occurred. Please try again.");
        } finally {
            setIsSubmiting(false);
        }
    });


    return { form, handleSignIn, isSubmiting }
}
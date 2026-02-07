import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react";
import { toast } from 'sonner'
import { signUpAction } from "../actions/signup-action";

const defaultValues = {
    name: "",
    email: "",
    password: ""
}

export function useSignUp() {
    const [isSubmiting, setIsSubmiting] = useState(false)

    const form = useForm<any>({
        // resolver: zodResolver(signUpUserSchema),
        defaultValues
    })

    // useSignIn.ts
    const handleSignUp = form.handleSubmit(async (data: any) => {
        try {
            setIsSubmiting(true);
            const res = await signUpAction(data);

            // Check the returned object!
            if (res?.success === false) {
                toast.error(res.message || "Invalid input");
                return;
            }

            toast.success("Signed up successfully!");
            form.reset();
        } catch (error) {
            toast.error("A server error occurred. Please try again.");
        } finally {
            setIsSubmiting(false);
        }
    });


    return { form, handleSignUp, isSubmiting }
}
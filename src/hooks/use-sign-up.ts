// import { userSchema, type User } from "@/db/user";
import { signupSchema, type SignupInput } from "@/db/user";
// import { zodResolver } from "@hookform/resolvers/zod";
import { zodResolver } from "mantine-form-zod-resolver";
import { actions } from "astro:actions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function useSignUp() {

    const [isPending, setIsPending] = useState(false);

    const form = useForm<SignupInput>({
        validate: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    async function onSubmit(values: SignupInput) {
        setIsPending(true);
        console.log(values)

        // const { data, error } = await actions.signUp(values);

        // setIsPending(false);

        // if (error) {
        //     toast.error(error.message || "Something went wrong!")
        //     return;
        // }

        // if (data?.success) {
        //     toast.success(data.message || "Welcome to Trackflow!")
        //     form.reset();
        //     setTimeout(() => {
        //         window.location.href = "/sign-in";
        //     }, 1500); // 1.5 seconds
        // }
    }

    return { form, onSubmit, isPending }
}

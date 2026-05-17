import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { type LoginInput, loginSchema } from "@/schema/login";

export default function useLogIn() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginInput) {
    setIsPending(true);

    try {
      // Call the Astro Action
      const { data: res, error } = await actions.login(data);

      if (error) {
        // Astro Actions return a structured error object
        toast.error(error.message || "Invalid credentials");
        return;
      }

      if (res?.success) {
        toast.success("Login successful! Redirecting...");
        form.reset();
        
        // Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsPending(false);
    }
  }

  return { form, onSubmit, isPending };
}
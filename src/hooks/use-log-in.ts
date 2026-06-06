import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { type LoginInput, loginSchema } from "@/schema/login";
import { useAction } from "@/hooks/use-action";

export default function useLogIn() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "test@admin.com",
      password: "admin-password",
    },
  });

  // Setup the action runner using your custom hook
  const { execute, isLoading, error } = useAction(
    async (data: LoginInput) => {
      const result = await actions.login(data);
      
      // Astro actions return an ActionError object on failure. 
      // We pass it forward or shape it to match your ActionResult type.
      return {
        data: result.data,
        error: result.error ? { message: result.error.message } : null,
      };
    },
    {
      loadingMessage: "Logging you in...",
      successMessage: "Login successful! Redirecting...",
      onSuccess: (res) => {
        if (res?.success) {
          form.reset();
          navigate("/dashboard");
        }
      },
      // Optional: useAction already toasts the error automatically!
      onError: (errMsg) => {
        console.error("Login failed:", errMsg);
      },
    }
  );

  // The form submit handler now just pipes data into execute
  const onSubmit = (data: LoginInput) => {
    execute(data);
  };

  return { 
    form, 
    onSubmit, 
    isPending: isLoading, // Maps to your hook's isLoading state
    error 
  };
}
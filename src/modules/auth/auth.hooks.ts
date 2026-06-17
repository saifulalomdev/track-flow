import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { useAction } from "@/hooks/use-action";
import { LoginInput, loginSchema } from "./auth.schema";

export default function useLogIn() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "test@admin.com",
      password: "admin-password",
    },
  });

  // Setup the action runner using your custom hook
  const { execute, isLoading } = useAction(
    async (data: LoginInput) => {
      const result = await actions.login(data);

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

      onError: (errMsg) => {
        console.error("Login failed:", errMsg);
      },
    }
  );

  // The form submit handler now just pipes data into execute
  const onSubmit = (data: LoginInput) => {
    execute(data);
  };

  return { form, onSubmit, isLoading };
}
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function useSignout() {
  const [isLoading, setIsLoading] = useState(false);

  const signout = async () => {
    try {
      setIsLoading(true);

      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            // This ensures the redirect only happens after the cookie is cleared
            window.location.href = "/auth/sign-in";
            toast.success("Signed out successfully");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "Failed to sign out");
          }
        }
      });
    } catch (err: any) {
      // This catch is still good for unexpected network errors
      toast.error("A network error occurred");
    } finally {
      setIsLoading(false);
    }
  };


  return {
    signout,
    isLoading,
  };
}
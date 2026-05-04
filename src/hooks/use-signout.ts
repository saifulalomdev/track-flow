import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export function useSignout() {
  const [isLoading, setIsLoading] = useState(false);

  const signout = async () => {
    try {
      setIsLoading(true);

      await authClient.signOut();

      toast.success("Signed out successfully");

      window.location.href = "/auth/sign-in";
    } catch (err: any) {
      toast.error(err?.message || "Failed to sign out");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signout,
    isLoading,
  };
}
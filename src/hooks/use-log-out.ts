import { actions } from "astro:actions";
import { useState } from "react";
import { toast } from "sonner";
import { navigate } from "astro:transitions/client";

export function useLogOut() {
  const [isLoading, setIsLoading] = useState(false);

  const logOut = async () => {
    setIsLoading(true);
    try {
      // 1. Call the logout action
      const { error } = await actions.logout();

      if (error) {
        toast.error(error.message || "Failed to log out");
        return;
      }

      // 2. Success feedback
      toast.success("Logged out successfully");

      // 3. Redirect to login page
      navigate("/login");
      
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logOut,
    isLoading,
  };
}
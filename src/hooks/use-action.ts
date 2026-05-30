import { useState, useTransition, useRef } from "react";
import { toast } from "sonner";

interface UseActionOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (error: string) => void;
  successMessage?: string;
  loadingMessage?: string;
}

type ActionResult<TData> = {
  data?: TData;
  error?: { message?: string } | string | null;
};

export function useAction<TInput, TData>(
  actionFn: (input: TInput) => Promise<ActionResult<TData>>,
  options?: UseActionOptions<TData>
) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // prevents race conditions (very important for dashboard filters)
  const requestIdRef = useRef(0);

  const execute = (input: TInput) => {
    setError(null);

    const toastId = toast.loading(
      options?.loadingMessage ?? "Processing your request..."
    );

    const requestId = ++requestIdRef.current;

    startTransition(async () => {
      try {
        const result = await actionFn(input);

        // ignore stale responses
        if (requestId !== requestIdRef.current) return;

        if (result.error) {
          const errMsg =
            typeof result.error === "string"
              ? result.error
              : result.error.message ?? "An unexpected error occurred.";

          setError(errMsg);
          options?.onError?.(errMsg);
          toast.error(errMsg, { id: toastId });
          return;
        }

        toast.success(options?.successMessage ?? "Success", {
          id: toastId,
        });

        if (result.data) {
          options?.onSuccess?.(result.data);
        }
      } catch (err) {
        const errMsg =
          err instanceof Error ? err.message : "Failed to execute action.";

        setError(errMsg);
        options?.onError?.(errMsg);
        toast.error(errMsg, { id: toastId });
      }
    });
  };

  return { execute, isLoading: isPending, error };
}
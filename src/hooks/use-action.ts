// src/hooks/use-action.ts
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

interface UseActionOptions<TData> {
  onSuccess?: (data: TData) => void;
  onError?: (error: string) => void;
  successMessage?: string;
  loadingMessage?: string;
}

export function useAction<TInput, TData>(
  actionFn: (input: TInput) => Promise<{ data?: TData; error?: any }>,
  options?: UseActionOptions<TData>
) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const execute = (input: TInput) => {
    setError(null);

    const toastId = toast.loading(options?.loadingMessage || "Processing your request...");

    startTransition(async () => {
      try {
        const result = await actionFn(input);

        if (result.error) {
          const errMsg = result.error.message || "An unexpected error occurred.";
          setError(errMsg);
          if (options?.onError) options?.onError(errMsg);
          toast.error(errMsg, { id: toastId });
          return;
        }

        if (options?.successMessage) {
          toast.success(options.successMessage, { id: toastId });
        }

        if (options?.onSuccess && result.data) {
          options.onSuccess(result.data as TData);
        }
      } catch (err: any) {
        const fallBackMsg = err.message || "Failed to execute mutation.";
        setError(fallBackMsg);
        toast.error(fallBackMsg, { id: toastId });
      }
    });
  };

  return {
    execute,
    isLoading: isPending,
    error,
  };
}
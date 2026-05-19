import { useState, useTransition } from 'react';
import { toast } from 'sonner';

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

  const execute = (input: TInput) => {
    setError(null);
    const toastId = toast.loading(options?.loadingMessage ?? 'Processing your request...');

    startTransition(async () => {
      try {
        const result = await actionFn(input);

        if (result.error) {
          const errMsg =
            typeof result.error === 'string'
              ? result.error
              : result.error.message ?? 'An unexpected error occurred.';

          setError(errMsg);
          options?.onError?.(errMsg);
          toast.error(errMsg, { id: toastId });
          return;
        }

        if (options?.successMessage) {
          toast.success(options.successMessage, { id: toastId });
        } else {
          toast.dismiss(toastId);
        }

        if (result.data) {
          options?.onSuccess?.(result.data);
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : 'Failed to execute mutation.';
        setError(errMsg);
        options?.onError?.(errMsg);
        toast.error(errMsg, { id: toastId });
      }
    });
  };

  return { execute, isLoading: isPending, error };
}
import { useState } from "react";
import { toast } from "sonner";
import { isActionError } from "astro:actions";

export function useAction<TInput, TOutput>(
    actionFn: (input?: TInput) => Promise<TOutput>,
    options?: {
        onSuccess?: (data: TOutput) => void;
        loadingMessage?: string;
    }
) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = async (input?: TInput) => {
        setIsLoading(true);
        setError(null);

        const toastId = toast.loading(options?.loadingMessage || "Processing...");

        try {
            const result: any = await actionFn(input);

            if (isActionError(result)) {
                throw new Error(result.message);
            }

            toast.success(result?.message || "Success!", { id: toastId });

            if (options?.onSuccess) {
                options.onSuccess(result);
            }

            return result;
        } catch (e: any) {
            const errorMessage = e.message || "Something went wrong";
            setError(errorMessage);
            toast.error(errorMessage, { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return { execute, isLoading, error };
}
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { subscriberSchema, type Subscriber } from "@/db/schema";
import { actions } from "astro:actions"
import { useState } from "react"

export function EmailForm() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<Subscriber>({
    resolver: zodResolver(subscriberSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: Subscriber) {
    setIsPending(true);

    const { data, error } = await actions.subscribe(values);

    setIsPending(false);

    if (error) {
      toast.error(error.message || "Something went wrong!")
      return;
    }

    if (data?.success) {
      toast.success(data.message || "Welcome to the waitlist!")

      if (data.newSubscriber) {
        form.reset();
      }
    }
  }

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-3 max-w-sm w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="name@domain.com"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Joining..." : "Join now"}
        </Button>
      </form>
    </Form>
  )
}
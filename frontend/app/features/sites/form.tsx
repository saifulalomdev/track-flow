import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteSchema, type SiteFormData } from "./schema";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { DialogClose } from "~/components/ui/dialog";

interface Props {
  initialData?: SiteFormData;
  onSubmit: (data: SiteFormData) => void;
  isLoading: boolean;
}

export const SiteForm = ({ initialData, onSubmit, isLoading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SiteFormData>({
    resolver: zodResolver(siteSchema),
    defaultValues: initialData || { title: "", url: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Title</label>
        <Input {...register("title")} placeholder="My shop" className="border p-2 w-full" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label>Website url</label>
        <Input
          {...register("url")}
          placeholder="https://myshop.com"
          className="border p-2 w-full"
        />
        {errors.url && <p className="text-red-500">{errors.url.message}</p>}
      </div>

      <div className="flex gap-3 justify-end">
         <DialogClose asChild>
          <Button variant='outline'>
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Submit"}
        </Button>
       
      </div>
    </form>
  );
};
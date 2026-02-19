import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteSchema, type SiteFormData } from "./schema";
import { Input } from "~/components/ui/input";

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
    defaultValues: initialData || { title: "" , url: ""},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Product Name</label>
        <Input {...register("title")} className="border p-2 w-full" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label>Price</label>
        <Input 
          {...register("url")} 
          className="border p-2 w-full" 
        />
        {errors.url && <p className="text-red-500">{errors.url.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {isLoading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
};
import { FormControl, FormField, FormItem, FormMessage } from "./form";
import type { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { Input } from "./input";

interface InputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}

export default function InputField<T extends FieldValues>({
  form,
  name,
  placeholder,
  type = "text",
}: InputFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>

            <Input {...field} placeholder={placeholder} type={type} className="py-4" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
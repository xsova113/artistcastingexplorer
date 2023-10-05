import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { filterFormSchema } from "@/lib/filterFormSchema";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

interface FirstNameFormFieldProps {
  form: UseFormReturn<z.infer<typeof filterFormSchema>>;
}

const NameSelect = ({ form }: FirstNameFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem className="w-full rounded-md bg-secondary p-2 md:w-1/2">
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Filter by name"
              disabled={form.formState.isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NameSelect;

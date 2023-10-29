import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { talentFormSchema } from "@/lib/talentFormSchema";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

interface UnionFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const UnionFormField = ({ form }: UnionFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="union"
      render={({ field }) => (
        <FormItem className="pt-1 max-sm:w-full">
          <FormLabel className="flex">Union Affiliation (optional)</FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={form.formState.isSubmitting}
              defaultValue={field.value}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UnionFormField;

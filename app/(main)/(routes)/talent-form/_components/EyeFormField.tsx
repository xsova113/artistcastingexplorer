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

interface EyeFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const EyeFormField = ({ form }: EyeFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="eye"
      render={({ field }) => (
        <FormItem className="rounded-lg bg-secondary px-3 pb-3 pt-1 max-sm:w-full">
          <FormLabel className="flex">Eye Colour</FormLabel>
          <FormControl>
            <Input
              {...field}
              defaultValue={field.value}
              type="text"
              placeholder="brown"
              disabled={form.formState.isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EyeFormField;

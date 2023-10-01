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

interface HeightFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const HeightFormField = ({ form }: HeightFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="height"
      render={({ field }) => (
        <FormItem className="bg-secondary px-3 pb-3 pt-1 rounded-lg">
          <FormLabel>Height</FormLabel>
          <FormControl>
            <Input {...field} placeholder="170" disabled={form.formState.isSubmitting} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HeightFormField;

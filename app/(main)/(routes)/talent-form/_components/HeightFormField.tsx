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
import { PatternFormat } from "react-number-format";

interface HeightFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const HeightFormField = ({ form }: HeightFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="height"
      render={({ field }) => (
        <FormItem className="rounded-lg bg-secondary px-3 pb-3 pt-1 max-sm:w-full">
          <FormLabel className="flex">Height (imperial)</FormLabel>
          <FormControl>
            <PatternFormat
              format="#'##"
              {...field}
              placeholder="5'9"
              disabled={form.formState.isSubmitting}
              customInput={Input}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default HeightFormField;

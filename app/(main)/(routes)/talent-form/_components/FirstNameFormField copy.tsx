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

interface FirstNameFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const FirstNameFormField = ({ form }: FirstNameFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="firstName"
      render={({ field }) => (
        <FormItem className="rounded-lg bg-secondary px-3 pb-3 pt-1 max-sm:w-full">
          <FormLabel className="flex items-center">
            <span className="text-lg text-red-500">*</span>
            First Name
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              required
              placeholder="First name"
              disabled={form.formState.isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FirstNameFormField;

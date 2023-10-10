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
        <FormItem className="bg-secondary max-sm:w-full px-3 pb-3 pt-1 rounded-lg">
          <FormLabel className="flex">First Name</FormLabel>
          <FormControl>
            <Input {...field} placeholder="First name" disabled={form.formState.isSubmitting} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FirstNameFormField;

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

interface EmailFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const EmailFormField = ({ form }: EmailFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem className="bg-secondary px-3 pb-3 pt-1 rounded-lg">
          <FormLabel>Email Address</FormLabel>
          <FormControl>
            <Input disabled={form.formState.isSubmitting} {...field} placeholder="Email address" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EmailFormField;

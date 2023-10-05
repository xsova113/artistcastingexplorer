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

interface MiddlenameFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const MiddlenameFormField = ({ form }: MiddlenameFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="middleName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Middlename</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Middlename" disabled={form.formState.isSubmitting} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MiddlenameFormField;

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

interface AgencyFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const AgencyFormField = ({ form }: AgencyFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="agency"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Agency</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Agency" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AgencyFormField;

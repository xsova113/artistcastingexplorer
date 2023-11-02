import {
  FormControl,
  FormDescription,
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
        <FormItem className="rounded-lg bg-secondary px-3 pb-3 pt-1 max-sm:w-full">
          <FormLabel className="flex">Agency</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Agency1, Agency2"
              disabled={form.formState.isSubmitting}
            />
          </FormControl>
          <FormMessage />
          <FormDescription className="mr-auto flex">Separete each by comma</FormDescription>
        </FormItem>
      )}
    />
  );
};

export default AgencyFormField;

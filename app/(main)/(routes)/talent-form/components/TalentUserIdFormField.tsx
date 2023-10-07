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

interface TalentUserIdFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const TalentUserIdFormField = ({ form }: TalentUserIdFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="talentUserId"
      render={({ field }) => (
        <FormItem className="rounded-lg bg-secondary px-3 pb-3 pt-1 max-sm:w-full">
          <FormLabel>User ID</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="User ID"
              disabled={form.formState.isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TalentUserIdFormField;

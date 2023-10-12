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

interface LastNameFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}
const LastNameFormField = ({ form }: LastNameFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="lastName"
      render={({ field }) => (
        <FormItem className="bg-secondary max-sm:w-full px-3 pb-3 pt-1 rounded-lg">
          <FormLabel className="flex">Last Name</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Last name" disabled={form.formState.isSubmitting} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LastNameFormField;

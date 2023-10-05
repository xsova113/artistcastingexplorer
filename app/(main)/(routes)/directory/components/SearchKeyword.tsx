import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { filterFormSchema } from "@/lib/filterFormSchema";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

interface FirstNameFormFieldProps {
  form: UseFormReturn<z.infer<typeof filterFormSchema>>;
}

const SearchKeyword = ({ form }: FirstNameFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="keyword"
      render={({ field }) => (
        <FormItem className="w-full rounded-md bg-secondary p-2 md:w-1/2">
          <FormLabel>Keyword</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Filter by keyword"
              disabled={form.formState.isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SearchKeyword;

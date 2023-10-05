import Stack from "@/components/Stack";
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

interface AgeRangeFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const AgeRangeFormField = ({ form }: AgeRangeFormFieldProps) => {
  return (
    <Stack>
      <div className="flex items-end gap-2">
        <FormField
          control={form.control}
          name="ageMin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value}
                  disabled={form.formState.isSubmitting}
                  className="max-w-[65px] rounded-none border-0 border-b focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="mb-2">-</span>
        <FormField
          control={form.control}
          name="ageMax"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  value={field.value}
                  disabled={form.formState.isSubmitting}
                  className="max-w-[65px] rounded-none border-0 border-b focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormDescription className="mt-2 text-xs">
        Age range for the role you can play.
      </FormDescription>
    </Stack>
  );
};

export default AgeRangeFormField;

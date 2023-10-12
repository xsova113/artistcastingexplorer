import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { talentFormSchema } from "@/lib/talentFormSchema";
import { Language } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

interface LanguageFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const LanguageFormField = ({ form }: LanguageFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="language"
      render={({ field }) => (
        <FormItem className="rounded-lg bg-secondary px-3 pb-3 pt-1 max-sm:w-full">
          <FormLabel className="flex">Language</FormLabel>
          <Select
            onValueChange={field.onChange}
            disabled={form.formState.isSubmitting}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger disabled={form.formState.isSubmitting}>
                <SelectValue
                  defaultValue={field.value}
                  placeholder="Select a english level"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(Language).map((item) => (
                <SelectItem key={item} value={item} className="capitalize">
                  {item.toLowerCase().replaceAll("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LanguageFormField;

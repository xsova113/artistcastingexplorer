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
import { JapaneseLevel, Language } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

interface JapLanguageFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const JapLanguageFormField = ({ form }: JapLanguageFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="JapaneseLanguage"
      render={({ field }) => (
        <FormItem className="rounded-lg bg-secondary px-3 pb-3 pt-1 max-sm:w-full">
          <FormLabel className="font-semibold">Japanese Skill Level</FormLabel>
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
              {Object.keys(JapaneseLevel).map((item) => (
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

export default JapLanguageFormField;

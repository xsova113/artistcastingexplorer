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
import { GenderType } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

interface GenderFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const GenderFormField = ({ form }: GenderFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="gender"
      render={({ field }) => (
        <FormItem className="bg-secondary px-3 pb-3 pt-1 rounded-lg max-sm:w-full">
          <FormLabel className="flex">Gender</FormLabel>
          <Select
            onValueChange={field.onChange}
            disabled={form.formState.isSubmitting}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger disabled={form.formState.isSubmitting}>
                <SelectValue
                  defaultValue={field.value}
                  placeholder="Select a gender"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(GenderType).map((item) => (
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

export default GenderFormField;

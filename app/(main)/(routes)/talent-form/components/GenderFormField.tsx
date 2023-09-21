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
        <FormItem>
          <FormLabel className="font-semibold">Gender</FormLabel>
          <Select
            onValueChange={field.onChange}
            disabled={form.formState.isSubmitting}
          >
            <FormControl>
              <SelectTrigger disabled={form.formState.isSubmitting}>
                <SelectValue placeholder="Select a gender" />
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

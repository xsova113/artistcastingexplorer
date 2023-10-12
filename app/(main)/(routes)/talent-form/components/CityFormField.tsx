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
import { City } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

interface CityFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const CityFormField = ({ form }: CityFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <FormItem className="rounded-lg bg-secondary px-3 pb-3 pt-1">
          <FormLabel className="flex">City</FormLabel>
          <Select
            onValueChange={field.onChange}
            disabled={form.formState.isSubmitting}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger disabled={form.formState.isSubmitting}>
                <SelectValue
                  placeholder="Select a city"
                  defaultValue={field.value}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(City).map((item) => (
                <SelectItem key={item} value={item} className="capitalize">
                  {item.toLowerCase().replace("_", " ")}
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

export default CityFormField;

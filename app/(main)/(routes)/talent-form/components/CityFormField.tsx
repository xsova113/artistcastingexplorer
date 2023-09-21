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
        <FormItem>
          <FormLabel className="font-semibold">City</FormLabel>
          <Select onValueChange={field.onChange} disabled={form.formState.isSubmitting}>
            <FormControl>
              <SelectTrigger disabled={form.formState.isSubmitting}>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(City).map((item) => (
                <SelectItem key={item} value={item} className="capitalize">
                  {item.toLowerCase()}
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

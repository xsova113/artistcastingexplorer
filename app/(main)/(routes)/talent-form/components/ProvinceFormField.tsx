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
import { Province } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

interface ProvinceFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}
const ProvinceFormField = ({ form }: ProvinceFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="province"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">Province</FormLabel>
          <Select
            onValueChange={field.onChange}
            disabled={form.formState.isSubmitting}
          >
            <FormControl>
              <SelectTrigger disabled={form.formState.isSubmitting}>
                <SelectValue
                  placeholder="Select a province"
                  defaultValue={field.value}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(Province).map((item) => (
                <SelectItem value={item} key={item} className="capitalize">
                  {item.replaceAll("_", " ").toLowerCase()}
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

export default ProvinceFormField;

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
import { Role } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

interface CityFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const RoleFormField = ({ form }: CityFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="performerType"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">Role</FormLabel>
          <Select
            onValueChange={field.onChange}
            disabled={form.formState.isSubmitting}
          >
            <FormControl>
              <SelectTrigger disabled={form.formState.isSubmitting}>
                <SelectValue
                  placeholder="Select a role"
                  defaultValue={field.value}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(Role).map((item) => (
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

export default RoleFormField;

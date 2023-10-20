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
  import { BodyType } from "@prisma/client";
  import { UseFormReturn } from "react-hook-form";
  import z from "zod";
  
  interface BodyTypeFormFieldProps {
    form: UseFormReturn<z.infer<typeof talentFormSchema>>;
  }
  
  const BodyTypeFormField = ({ form }: BodyTypeFormFieldProps) => {
    return (
      <FormField
        control={form.control}
        name="bodyType"
        render={({ field }) => (
          <FormItem className="rounded-lg bg-secondary px-3 pb-3 pt-1 max-sm:w-full">
            <FormLabel className="flex">Body Type</FormLabel>
            <Select
              onValueChange={field.onChange}
              disabled={form.formState.isSubmitting}
              defaultValue={field.value}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger disabled={form.formState.isSubmitting}>
                  <SelectValue
                    placeholder="Select body type"
                    defaultValue={field.value}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.keys(BodyType).map((item) => (
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
  
  export default BodyTypeFormField;
  
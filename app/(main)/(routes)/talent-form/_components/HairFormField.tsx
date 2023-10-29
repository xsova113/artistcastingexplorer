import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { talentFormSchema } from "@/lib/talentFormSchema";
  import { UseFormReturn } from "react-hook-form";
  import z from "zod";
  
  interface HairFormFieldProps {
    form: UseFormReturn<z.infer<typeof talentFormSchema>>;
  }
  
  const HairFormField = ({ form }: HairFormFieldProps) => {
    return (
      <FormField
        control={form.control}
        name="hair"
        render={({ field }) => (
          <FormItem className="bg-secondary max-sm:w-full px-3 pb-3 pt-1 rounded-lg">
            <FormLabel className="flex">Hair Colour</FormLabel>
            <FormControl>
              <Input defaultValue={field.value} {...field} type="text" placeholder="black" disabled={form.formState.isSubmitting} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };
  
  export default HairFormField;
  
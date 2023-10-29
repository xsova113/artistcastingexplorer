"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { talentFormSchema } from "@/lib/talentFormSchema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface AgeCheckFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const AgeCheckFormField = ({ form }: AgeCheckFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="ageCheck"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ageCheck"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <div className="grid gap-1.5 leading-none">
              <FormLabel
                htmlFor="ageCheck"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I confirm I am 18 years of age or older
              </FormLabel>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

export default AgeCheckFormField;

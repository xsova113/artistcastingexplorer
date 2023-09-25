import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { talentFormSchema } from "@/lib/talentFormSchema";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

interface BioFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const BioFormField = ({ form }: BioFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="bio"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder="Tell us about yourself, what motivates you, and what you have accomplished..."
              className="rounded-lg border"
              minLength={150}
              rows={6}
              disabled={form.formState.isSubmitting}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BioFormField;

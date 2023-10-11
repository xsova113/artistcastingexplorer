import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { talentFormSchema } from "@/lib/talentFormSchema";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import FileUpload from "./FileUpload";

interface ImagesFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const ImagesFormField = ({ form }: ImagesFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="images"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Portfolio</FormLabel>
          <FormControl className="z-50">
            <FileUpload
              disabled={form.formState.isSubmitting}
              value={field.value}
              onChange={field.onChange}
              onRemove={(url) =>
                field.onChange([
                  ...field.value.filter((current) => current !== url),
                ])
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImagesFormField;

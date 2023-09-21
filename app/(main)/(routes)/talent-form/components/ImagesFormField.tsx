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
          <FormControl>
            <FileUpload
              disabled={form.formState.isSubmitting}
              value={field.value.map((image) => image.url)}
              onChange={(url) => field.onChange([...field.value, { url }])}
              onRemove={(url) =>
                field.onChange([
                  ...field.value.filter((current) => current.url !== url),
                ])
              }
            />
          </FormControl>
          <FormDescription>
            Upload images or videos to showcase your skills
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImagesFormField;

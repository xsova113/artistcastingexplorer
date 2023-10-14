import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { talentFormSchema } from "@/lib/talentFormSchema";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import ImageUpload from "./ImageUpload";

interface ImagesFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
  setFilesToDelete: (values: string[]) => void;
  filesToDelete: string[];
}

const ImagesFormField = ({
  form,
  setFilesToDelete,
  filesToDelete,
}: ImagesFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="images"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Upload Images</FormLabel>
          <FormControl>
            <ImageUpload
              disabled={form.formState.isSubmitting}
              values={field.value}
              onChange={field.onChange}
              onRemove={async ({ url, fileKey }) => {
                field.onChange([
                  ...field.value.filter((current) => current.url !== url),
                ]);
                setFilesToDelete([...filesToDelete, fileKey]);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImagesFormField;

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
import VideoUpload from "./VideoUpload";

interface VideoFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
  setFilesToDelete: (values: string[]) => void;
  filesToDelete: string[];
}

const VideoFormField = ({
  form,
  setFilesToDelete,
  filesToDelete,
}: VideoFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="videos"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Upload Videos</FormLabel>
          <FormControl>
            <VideoUpload
              disabled={form.formState.isSubmitting}
              values={field.value || []}
              onChange={field.onChange}
              onRemove={async ({ url, fileKey }) => {
                field.onChange(
                  field.value
                    ? [...field.value.filter((current) => current.url !== url)]
                    : [],
                );
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

export default VideoFormField;

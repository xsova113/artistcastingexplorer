import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { talentFormSchema } from "@/lib/talentFormSchema";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import "react-quill/dist/quill.snow.css";

interface BioFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const BioFormField = ({ form }: BioFormFieldProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill")), []);

  return (
    <FormField
      control={form.control}
      name="bio"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <ReactQuill
              theme="snow"
              {...field}
              placeholder="Tell people about yourself, what motivates you, and what you have accomplished..."
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BioFormField;

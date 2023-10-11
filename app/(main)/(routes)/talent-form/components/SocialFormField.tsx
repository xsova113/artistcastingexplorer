import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TalentFormValues, talentFormSchema } from "@/lib/talentFormSchema";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";

interface SocialFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const socials = ["instagram", "twitter", "youtube", "tiktok", "website"];

const SocialFormField = ({ form }: SocialFormFieldProps) => {
  return (
    <>
      {socials.map((social) => (
        <FormField
          key={social}
          control={form.control}
          // @ts-ignore
          name={social}
          render={({ field }) => (
            <FormItem className="flex items-baseline gap-x-2">
              <FormLabel className="font-semibold capitalize">
                {social}:
              </FormLabel>

              <FormControl>
                {/* @ts-ignore */}
                <Input
                  {...field}
                  placeholder={"Your " + social + " url"}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
};

export default SocialFormField;

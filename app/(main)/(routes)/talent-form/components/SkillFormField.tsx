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
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import { skillOptions } from "@/lib/data";

interface ProvinceFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const SkillFormField = ({ form }: ProvinceFormFieldProps) => {
  const animatedComponents = makeAnimated();

  return (
    <FormField
      control={form.control}
      name="skills"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-semibold">Add Skills</FormLabel>

          <FormControl>
            <CreatableSelect
              isMulti
              components={animatedComponents}
              value={field.value.map((value) => ({
                ...value,
                label:
                  value.skill![0].toUpperCase() +
                  value.skill?.substring(1).replaceAll("_", " "),
                value: value.skill,
                skill: value.skill,
              }))}
              onChange={(value) => field.onChange(value)}
              options={skillOptions}
              onCreateOption={(value) =>
                field.onChange([
                  ...field.value,
                  {
                    label: value,
                    value: value,
                    skill: value,
                  },
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

export default SkillFormField;

"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { talentFormSchema } from "@/lib/talentFormSchema";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

interface DobFormFieldProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const DobFormField = ({ form }: DobFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="dob"
      render={({ field }) => (
        <FormItem className="flex flex-col max-sm:w-[40%] rounded-lg bg-secondary p-3">
          <FormLabel>Date of birth</FormLabel>
          <Popover>
            <PopoverTrigger className="rounded border bg-white px-3 py-2">
              {format(field.value, "yyyy-MM-dd")}
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <Calendar
                onChange={(date) => field.onChange(date)}
                maxDate={new Date()}
                color="orange"
                date={field.value}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DobFormField;

"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import FlexBetween from "@/components/FlexBetween";
// @ts-ignore
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import * as z from "zod";
import { filterFormSchema } from "@/lib/filterFormSchema";

interface GenderSelectProps {
  form: UseFormReturn<z.infer<typeof filterFormSchema>>;
}

export function AgeSelect({ form }: GenderSelectProps) {
  return (
    <FormField
      control={form.control}
      name="ageRange"
      render={({ field }) => (
        <FormItem className="md:w-64 w-full rounded-md bg-secondary p-2">
          <FormLabel className="font-semibold">Age Range</FormLabel>

          <div className="flex py-1">
            <span className="ml-auto">
              {field.value && field.value.length !== 0 ? field.value[0] : 25}
            </span>
            <FlexBetween className="w-full">
              <FormControl>
                <RangeSlider
                  id="range-slider"
                  defaultValue={[25, 45]}
                  min={12}
                  max={100}
                  onInput={field.onChange}
                  className="mx-2"
                />
              </FormControl>
            </FlexBetween>
            <span className="ml-auto">
              {field.value && field.value.length !== 0 ? field.value[1] : 45}
            </span>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

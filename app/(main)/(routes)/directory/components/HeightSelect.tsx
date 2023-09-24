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
import z from "zod";
import { filterFormSchema } from "@/lib/filterFormSchema";

interface GenderSelectProps {
  form: UseFormReturn<z.infer<typeof filterFormSchema>>;
}

export function HeightSelect({ form }: GenderSelectProps) {
  return (
    <FormField
      control={form.control}
      name="heightRange"
      render={({ field }) => (
        <FormItem className="w-full rounded-md bg-secondary p-2 md:w-52">
          <FormLabel className="font-semibold">Height Range</FormLabel>

          <div className="flex py-1">
            <span className="ml-auto">
              {field.value && field.value.length !== 0 ? field.value[0] : 150}
            </span>
            <FlexBetween className="w-full">
              <FormControl>
                <RangeSlider
                  id="range-slider"
                  defaultValue={[150, 180]}
                  min={100}
                  max={350}
                  onInput={field.onChange}
                  className="mx-2"
                />
              </FormControl>
            </FlexBetween>
            <span className="ml-auto">
              {field.value && field.value.length !== 0 ? field.value[1] : 180}
            </span>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

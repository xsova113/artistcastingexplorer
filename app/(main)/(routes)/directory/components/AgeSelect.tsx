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

interface GenderSelectProps {
  form: UseFormReturn<{ ageRange?: number[] }>;
}

export function AgeSelect({ form }: GenderSelectProps) {
  return (
    <FormField
      control={form.control}
      name="ageRange"
      render={({ field }) => (
        <FormItem className="w-52 rounded-md bg-secondary p-2">
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
                  min={18}
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

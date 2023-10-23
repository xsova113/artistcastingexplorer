"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterFormSchema } from "@/lib/filterFormSchema";
import { GenderType } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface GenderSelectProps {
  form: UseFormReturn<z.infer<typeof filterFormSchema>>;
}

export function GenderSelect({ form }: GenderSelectProps) {
  return (
    <FormField
      control={form.control}
      name="gender"
      render={({ field }) => (
        <FormItem className="w-full rounded-md bg-secondary p-2 md:w-52">
          <FormLabel className="font-semibold">Gender</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select a gender"
                  defaultValue={field.value}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(GenderType).map((item) => (
                <SelectItem key={item} value={item} className="capitalize">
                  {item.toLowerCase().replaceAll("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

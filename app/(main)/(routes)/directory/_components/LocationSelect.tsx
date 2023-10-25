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
import { City, Province } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

interface GenderSelectProps {
  form: UseFormReturn<z.infer<typeof filterFormSchema>>;
  city: City | undefined;
}

export function LocationSelect({ form, city }: GenderSelectProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem className="w-full rounded-md bg-secondary p-2 md:w-52">
            <FormLabel className="font-semibold">City</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.keys(City).map((item) => (
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

      {city === "OTHER_PROVINCE" && (
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem className="w-full rounded-md bg-secondary p-2 md:w-52">
              <FormLabel className="font-semibold">Province</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a province" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(Province).map((item) => (
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
      )}
    </>
  );
}

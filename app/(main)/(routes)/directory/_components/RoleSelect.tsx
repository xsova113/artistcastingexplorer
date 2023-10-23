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
import { Role } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface GenderSelectProps {
  form: UseFormReturn<z.infer<typeof filterFormSchema>>;
}

export function RoleSelect({ form }: GenderSelectProps) {
  return (
    <FormField
      control={form.control}
      name="role"
      render={({ field }) => (
        <FormItem className="md:w-52 w-full rounded-md bg-secondary p-2">
          <FormLabel className="font-semibold">Role Type</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder="Select a role"
                  defaultValue={field.value}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.keys(Role).map((item) => (
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

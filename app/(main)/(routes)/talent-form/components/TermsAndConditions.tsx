"use client";

import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { talentFormSchema } from "@/lib/talentFormSchema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface TermsAndConditionsProps {
  form: UseFormReturn<z.infer<typeof talentFormSchema>>;
}

const TermsAndConditions = ({ form }: TermsAndConditionsProps) => {
  return (
    <FormField
      control={form.control}
      name="termAcceptance"
      render={({ field }) => (
        <FormItem>
          <div className="items-top flex space-x-2">
            <Checkbox
              id="terms1"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <div className="grid gap-1.5 leading-none">
              <FormLabel
                htmlFor="terms1"
                className="flex gap-x-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept
                <Link
                  href={"#"}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Terms & Conditions
                </Link>
                and
                <Link
                  href={"#"}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
              </FormLabel>
              <p className="text-sm text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

export default TermsAndConditions;

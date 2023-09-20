"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { GenderSelect } from "./GenderSelect";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { FormEvent } from "react";
import { AgeSelect } from "./AgeSelect";

const formSchema = z.object({
  gender: z.string().optional(),
  ageRange: z.number().array().optional(),
});

const FilterForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "",
      ageRange: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const query = {
      gender: values.gender,
      ageMin: values.ageRange ? values.ageRange[0] : 25,
      ageMax: values.ageRange ? values.ageRange[1] : 45,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.pathname,
        query,
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url, { scroll: false });
  };

  const clearForm = (e: FormEvent) => {
    e.preventDefault();
    form.reset();
    window.history.replaceState(null, "", "/directory");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-4">
          <GenderSelect form={form} />
          <AgeSelect form={form} />
        </div>
        <div className="mt-4 flex items-center justify-end gap-4">
          <Button onClick={(e) => clearForm(e)} variant={"secondary"}>
            Clear
          </Button>
          <Button type="submit">Search</Button>
        </div>
      </form>
    </Form>
  );
};

export default FilterForm;

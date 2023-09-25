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
import { filterFormSchema } from "@/lib/filterFormSchema";
import { LocationSelect } from "./LocationSelect";
import NameSelect from "./NameSelect";
import { RoleSelect } from "./RoleSelect";
import { HeightSelect } from "./HeightSelect";
import SearchKeyword from "./SearchKeyword";

const FilterForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof filterFormSchema>>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      gender: "",
      ageRange: [],
      heightRange: [],
      name: "",
      keyword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof filterFormSchema>) => {
    const query = {
      gender: values.gender,
      ageMin: values.ageRange ? values.ageRange[0] : 25,
      ageMax: values.ageRange ? values.ageRange[1] : 45,
      heightMin: values.heightRange ? values.heightRange[0] : 150,
      heightMax: values.heightRange ? values.heightRange[1] : 200,
      city: values.city,
      province: values.province,
      name: values.name,
      role: values.role,
      keyword: values.keyword,
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
    window.location.reload();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-4 p-1">
          <GenderSelect form={form} />
          <AgeSelect form={form} />
          <LocationSelect form={form} />
          <NameSelect form={form} />
          <RoleSelect form={form} />
          <HeightSelect form={form} />
          <SearchKeyword form={form} />
        </div>
        <div className="mt-4 flex items-center justify-end gap-4 p-1">
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

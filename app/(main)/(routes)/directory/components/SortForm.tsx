"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const SortForm = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const router = useRouter();

  const onSelect = (value: string) => {
    if (value) {
      searchParams.set("order_by", value);
    } else {
      searchParams.delete("order_by");
    }

    const newPathname = `${window.location.pathname}?${searchParams}`;

    router.push(newPathname, { scroll: false });
  };

  return (
    <Select onValueChange={(value) => onSelect(value)}>
      <SelectTrigger className="w-[180px] my-2 md:mx-10 mx-4">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="recently_updated">Recently Updated</SelectItem>
          <SelectItem value="name-a">Name: A - Z</SelectItem>
          <SelectItem value="name-z">Name: Z - A</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortForm;

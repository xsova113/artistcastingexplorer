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
import { useSortStore } from "@/hooks/useSortStore";

export type OrderBy = "recently_updated" | "name-a" | "name-z";

const SortForm = () => {
  const { setOrderBy } = useSortStore();

  const onSelect = (value: OrderBy) => {
    setOrderBy(value);
  };

  return (
    <Select onValueChange={(value: OrderBy) => onSelect(value)}>
      <SelectTrigger className="h-8 w-[180px]">
        <SelectValue placeholder="Order By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort By</SelectLabel>
          <SelectItem value="recently_updated">Recently Updated</SelectItem>
          <SelectItem value="name-a">Name: A - Z</SelectItem>
          <SelectItem value="name-z">Name: Z - A</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortForm;

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

interface SelectItemsPerPageProps {
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
}

const SelectItemsPerPage = ({
  itemsPerPage,
  setItemsPerPage: selectItemsPerPage,
}: SelectItemsPerPageProps) => {
  const onSelect = (value: string) => {
    selectItemsPerPage(Number(value));
  };

  return (
    <Select onValueChange={(value: string) => onSelect(value)}>
      <SelectTrigger className="h-8 w-[180px]">
        <SelectValue placeholder={`Show ${itemsPerPage}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Talents per page</SelectLabel>
          <SelectItem value="12">Show 12</SelectItem>
          <SelectItem value="24">Show 24</SelectItem>
          <SelectItem value="48">Show 48</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectItemsPerPage;

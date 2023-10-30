"use client";

import ToolTIp from "@/components/ToolTIp";
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
import { checkSubscription } from "@/lib/subscription";
import { useEffect, useState } from "react";

export type OrderBy = "recently_updated" | "name-a" | "name-z";

const SortForm = () => {
  const { setOrderBy } = useSortStore();
  const [isPremium, setIsPremium] = useState(false);

  const checkIsPremium = async () => {
    const response = await checkSubscription();
    setIsPremium(response);
  };

  const onSelect = (value: OrderBy) => {
    setOrderBy(value);
  };

  useEffect(() => {
    checkIsPremium();
  }, []);

  return (
    <Select
      onValueChange={(value: OrderBy) => onSelect(value)}
      disabled={!isPremium}
    >
      <SelectTrigger className="h-8 w-[180px]">
        {isPremium ? (
          <SelectValue placeholder={"Order By"} />
        ) : (
          <ToolTIp description={"Please subscribe to premium for this feature"}>
            <SelectValue placeholder={"Order By"} />
          </ToolTIp>
        )}
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

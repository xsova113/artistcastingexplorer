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
import checkTalent from "@/lib/checkTalent";
import { checkSubscription } from "@/lib/subscription";
import { useAuth } from "@clerk/nextjs";
import { TalentProfile } from "@prisma/client";
import { Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export type OrderBy = "recently_updated" | "name-a" | "name-z";

const SortForm = () => {
  const { setOrderBy } = useSortStore();
  const [isPremium, setIsPremium] = useState(false);
  const [talent, setTalent] = useState<TalentProfile>();
  const { orgRole } = useAuth();

  const getTalent = async () => {
    const talent = await checkTalent();
    setTalent(talent);
  };

  const checkIsPremium = async () => {
    const response = await checkSubscription();
    setIsPremium(response);
  };

  const onSelect = (value: OrderBy) => {
    setOrderBy(value);
  };

  useEffect(() => {
    checkIsPremium();
    getTalent();
  }, []);

  return (
    <Select onValueChange={(value: OrderBy) => onSelect(value)}>
      <SelectTrigger className="h-8 w-[180px]">
        <SelectValue placeholder={"Order By"} />
      </SelectTrigger>
      <SelectContent>
        {isPremium || talent?.isApproved || orgRole === "admin" ? (
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
            <SelectItem value="recently_updated">Recently Updated</SelectItem>
            <SelectItem value="name-a">Name: A - Z</SelectItem>
            <SelectItem value="name-z">Name: Z - A</SelectItem>
          </SelectGroup>
        ) : (
          <Link
            href={"/subscribe"}
            className="flex items-center gap-1 px-2 text-sm hover:bg-primary-foreground"
          >
            <Star size={16} />
            Premium Fefature
          </Link>
        )}
      </SelectContent>
    </Select>
  );
};

export default SortForm;

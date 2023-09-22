"use client";

import Stack from "@/components/Stack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useCallback, useEffect, useState } from "react";

type Status = "approved" | "rejected" | "pending";

const FilterReview = () => {
  const router = useRouter();
  const [status, setStatus] = useState<Status>();
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handleChange = useCallback(
    (status: Status | undefined) => {
      const query = {
        status,
        lastName: nameInput,
        email: emailInput,
      };

      const url = qs.stringifyUrl(
        {
          url: window.location.pathname,
          query,
        },
        { skipEmptyString: true, skipNull: true },
      );

      router.push(url, { scroll: false });
    },
    [emailInput, nameInput, router],
  );

  useEffect(() => {
    handleChange(status);
  }, [handleChange, status]);

  return (
    <div className="mt-6 flex items-start gap-10 md:gap-20">
      <RadioGroup
        defaultValue="option-one"
        className="space-y-2"
        onValueChange={(value: Status) => setStatus(value)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="approved" id="option-one" />
          <Label htmlFor="option-one">Approved</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="rejected" id="option-two" />
          <Label htmlFor="option-two">Rejected</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="pending" id="option-two" />
          <Label htmlFor="option-two">Pending</Label>
        </div>
      </RadioGroup>

      <Stack className="gap-2">
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <Label htmlFor="search-input" className="max-md:self-start">
            Search Last Name:
          </Label>
          <Input
            id="search-input"
            type="text"
            onChange={(e) => setNameInput(e.target.value)}
            className="ml-auto w-fit"
            placeholder="Filter By Last Name"
          />
        </div>
        <div className="flex flex-col items-center gap-2 md:flex-row">
          <Label htmlFor="search-input" className="max-md:self-start">
            Search Email Address:
          </Label>
          <Input
            id="search-input"
            type="email"
            onChange={(e) => setEmailInput(e.target.value)}
            className="ml-auto w-fit"
            placeholder="Filter By Email"
          />
        </div>
        <Button
        className="w-fit self-end"
        variant={"secondary"}
        onClick={() => {
          window.history.replaceState(null, "", "/profileReview");
          window.location.reload();
        }}
      >
        Clear Search
      </Button>
      </Stack>
    </div>
  );
};

export default FilterReview;

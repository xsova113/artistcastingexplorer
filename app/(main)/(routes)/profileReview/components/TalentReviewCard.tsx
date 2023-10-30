"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TalentProfileType } from "@/types/talentProfileType";
import { useReviewStore } from "@/hooks/useReviewStore";
import { Badge } from "@/components/ui/badge";
import TalentDetailSheet from "./TalentDetailSheet";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface TalentReviewCard {
  talent: TalentProfileType;
  selectedTalentIds: string[];
  setSelectedTalentIds: (value: any) => void;
}

const TalentReviewCard = ({
  talent,
  selectedTalentIds,
  setSelectedTalentIds,
}: TalentReviewCard) => {
  const { onOpen } = useReviewStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card
      key={talent.id}
      className="col-span-6 w-[165px] drop-shadow transition-all sm:w-[230px] md:col-span-4 lg:col-span-3"
    >
      <div
        onClick={() => setIsOpen(true)}
        className="relative h-[130px] w-full cursor-pointer sm:h-[150px]"
      >
        <Image
          src={
            talent.images.length > 0
              ? talent.images.filter(
                  (image) =>
                    image.url.split(".").pop() === "jpg" ||
                    image.url.split(".").pop() === "png" ||
                    image.url.split(".").pop() === "jpeg",
                )[0].url
              : "/user_placeholder.jpg"
          }
          alt={"image"}
          fill
          className="rounded-t-lg object-cover"
        />
        <Checkbox
          className="absolute right-0 m-2 bg-white"
          checked={selectedTalentIds.includes(talent.id)}
          onCheckedChange={(checked) => {
            return checked
              ? setSelectedTalentIds((prev: string[]) => [...prev, talent.id])
              : setSelectedTalentIds(
                  selectedTalentIds.filter((value) => value !== talent.id),
                );
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      </div>

      <CardHeader className="p-2">
        <CardTitle className="text-md flex w-full items-center sm:text-lg">
          {talent.stageName ? (
            <span>{talent.stageName}</span>
          ) : (
            <span>
              {talent.firstName}
              <br />
              {talent.lastName}
            </span>
          )}

          <Badge
            className={cn(
              "ml-auto hover:cursor-default",
              talent.isApproved === true && "bg-green-500 hover:bg-green-400",
              talent.isApproved === false && "bg-red-500 hover:bg-red-400",
            )}
          >
            {talent.isApproved === true
              ? "Approved"
              : talent.isApproved === false
              ? "Rejected"
              : "Pending"}
          </Badge>
        </CardTitle>
        <CardDescription className="capitalize">
          {talent.performerType.role.toLowerCase().replaceAll("_", " ")}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 py-1 max-sm:text-xs">
        <p className="capitalize">
          {talent.location.city?.toLocaleLowerCase() ||
            talent.location.province?.toString()}
        </p>
        <p>
          Age: {talent.ageMin} - {talent.ageMax}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 bg-secondary p-2">
        <div className="mr-auto flex gap-2">
          <TalentDetailSheet
            talent={talent}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <Button
            className="bg-red-500 text-white hover:bg-red-400 hover:text-white max-sm:text-xs"
            variant={"outline"}
            size={"sm"}
            onClick={() => onOpen({ talentIds: [talent.id] }, "reject")}
            disabled={talent.isApproved === false}
          >
            Reject
          </Button>
        </div>

        <Button
          className="w-full max-sm:text-xs"
          onClick={() => onOpen({ talentIds: [talent.id] }, "approve")}
          size={"sm"}
          disabled={talent.isApproved === true}
        >
          Approve
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TalentReviewCard;

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAge, cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TalentProfileType } from "@/types/talentProfileType";
import { useReviewStore } from "@/hooks/useReviewStore";
import { Badge } from "@/components/ui/badge";
import TalentDetailSheet from "./TalentDetailSheet";
import { useState } from "react";

interface TalentReviewCard {
  talent: TalentProfileType;
}

const TalentReviewCard = ({ talent }: TalentReviewCard) => {
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
            talent.images.filter(
              (image) =>
                image.url.split(".").pop() === ("jpg" || "png" || "jpeg"),
            )[0].url
          }
          alt={"image"}
          fill
          className="rounded-t-lg object-cover"
        />
      </div>

      <CardHeader className="p-2">
        <CardTitle className="text-md flex w-full items-center sm:text-lg">
          {talent.firstName} {talent.lastName}
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
          Age: {talent.ageMin} -{" "}
          {talent.ageMax}
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
            onClick={() => onOpen({ talentId: talent.id }, "reject")}
            disabled={talent.isApproved === false}
          >
            Reject
          </Button>
        </div>

        <Button
          className="w-full max-sm:text-xs"
          onClick={() => onOpen({ talentId: talent.id }, "approve")}
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

"use client";

import { buttonVariants } from "@/components/ui/button";
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

interface TalentReviewCard {
  talent: TalentProfileType;
}

const TalentReviewCard = ({ talent }: TalentReviewCard) => {
  const { onOpen } = useReviewStore();

  return (
    <Card
      key={talent.id}
      className="w-[165px] drop-shadow transition-all sm:w-[230px]"
    >
      <button className="w-full text-start">
        <div className="relative h-[130px] w-full sm:h-[150px]">
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
            Age: {getAge(talent.dob.toString()) - 5} -{" "}
            {getAge(talent.dob.toString()) + 5}
          </p>
        </CardContent>
      </button>
      <CardFooter className="flex flex-col gap-2 bg-secondary p-2">
        <div className="mr-auto flex gap-2">
          <Button className="max-sm:text-xs" variant={"outline"} size={"sm"}>
            Detail
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-400 hover:text-white max-sm:text-xs"
            variant={"outline"}
            size={"sm"}
            onClick={() => onOpen({ talentId: talent.id }, "reject")}
          >
            Reject
          </Button>
        </div>

        <Button
          className={cn(
            "w-full max-sm:text-xs",
            buttonVariants({ size: "sm" }),
          )}
          onClick={() => onOpen({ talentId: talent.id }, "approve")}
        >
          Approve
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TalentReviewCard;

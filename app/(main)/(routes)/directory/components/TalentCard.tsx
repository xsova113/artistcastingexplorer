"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { City, Province } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TalentCardProps {
  name: string;
  title: string;
  location: City | Province;
  age: number;
  image: string;
  email: string;
  id: string;
}

const TalentCard = ({
  age,
  image,
  location,
  name,
  title,
  id,
}: TalentCardProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Card className="w-[165px] drop-shadow transition-all sm:w-[230px]">
      <Link href={`/profile/${id}`}>
        <div className="relative h-[130px] w-full sm:h-[150px]">
          <Image
            src={image}
            alt={"image"}
            fill
            className="rounded-t-lg object-cover"
          />
        </div>

        <CardHeader className="p-2">
          <CardTitle className="text-md sm:text-lg">{name}</CardTitle>
          <CardDescription className="capitalize">
            {title.toLowerCase().replaceAll("_", " ")}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 py-1 max-sm:text-xs">
          <p className="capitalize">{location.toLocaleLowerCase()}</p>
          <p>
            Age: {age - 5} - {age + 5}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="gap-x-2 bg-secondary p-2">
        <Button
          className={cn("max-sm:text-xs", buttonVariants({ size: "sm" }))}
        >
          Contact
        </Button>
        <Link
          href={`/profile/${id}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "max-sm:text-xs",
          )}
        >
          Detail
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TalentCard;

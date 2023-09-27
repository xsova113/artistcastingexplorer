"use client";

import { fetchSavedTalents } from "@/actions/fetchSavedTalents";
import saveTalent from "@/actions/saveTalent";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { TalentProfileType } from "@/types/talentProfileType";
import { City, Province, SavedTalent, UserSavedTalent } from "@prisma/client";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface TalentCardProps {
  name: string;
  title: string;
  location: City | Province | null;
  ageMin: number;
  ageMax: number;
  image: string;
  email: string;
  id: string;
  data: TalentProfileType;
}

export type UserSavedTalentType = UserSavedTalent & {
  savedTalents: SavedTalent[];
};

const TalentCard = ({
  ageMin,
  ageMax,
  image,
  location,
  name,
  title,
  id,
  data,
}: TalentCardProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favouritedTalent, setFavouritedTalent] =
    useState<UserSavedTalentType>();
  // const [selectedTalentId, setSelectedTalentId] = useState<string>();

  const onSave = async () => {
    try {
      setLoading(true);
      // setSelectedTalentId((prev) => [...prev, data.id]);
      await saveTalent(data.id);
    } catch (error: any) {
      toast({
        title: "Error favouriting talents",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const getSavedTalents = useCallback(async () => {
    const response = await fetchSavedTalents();
    if (!response) return console.log("No savedTalents found");

    setFavouritedTalent(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSave]);

  useEffect(() => {
    setIsMounted(true);
    getSavedTalents();
  }, [getSavedTalents]);

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
          <p className="capitalize">{location?.toLocaleLowerCase()}</p>
          <p>
            Age: {ageMin} - {ageMax}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col items-start bg-secondary p-2">
        <button className="px-2 pb-2" onClick={onSave} disabled={loading}>
          <Heart
            size={20}
            className={cn(
              favouritedTalent?.savedTalents
                .map((talent) => talent.talentProfileId)
                .includes(data.id) && "fill-red-500 text-red-500",
            )}
          />
        </button>
        <div className="flex items-center gap-x-2">
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
        </div>
      </CardFooter>
    </Card>
  );
};

export default TalentCard;

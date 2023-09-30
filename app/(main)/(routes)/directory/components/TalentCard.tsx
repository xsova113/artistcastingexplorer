"use client";

import { fetchSavedTalents } from "@/actions/fetchSavedTalents";
import createSavedTalents from "@/actions/createSavedtalents";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { TalentProfileType } from "@/types/talentProfileType";
import { City, Province, SavedTalent, UserSavedTalent } from "@prisma/client";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { updateSavedTalents } from "@/actions/updateSavedTalents";
import { removeSavedTalents } from "@/actions/removeSavedTalents";

interface TalentCardProps {
  name: string;
  title: string;
  location: City | Province | null;
  ageMin: number;
  ageMax: number;
  image: string;
  id: string;
  data: TalentProfileType;
  userId?: string | null;
  isSaving: boolean;
  setIsSaving: (loading: boolean) => void;
  setSelectedTalentId: (value: any) => void;
  selectedTalentId?: string[];
  UserSavedTalent?: UserSavedTalentType;
  fetchUserSavedTalent: () => void;
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
  isSaving,
  userId,
  setSelectedTalentId,
  selectedTalentId,
  UserSavedTalent,
  fetchUserSavedTalent,
}: TalentCardProps) => {
  const [loading, setLoading] = useState(false);
  const [favouritedTalent, setFavouritedTalent] =
    useState<UserSavedTalentType>();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const onSave = async () => {
    try {
      setLoading(true);

      if (!userId) {
        return toast({
          title: "Action failed",
          description: "Please login to save a talent.",
        });
      }

      // If UserSavedTalent doesn't exist, create it
      if (!UserSavedTalent) {
        await createSavedTalents([data.id]);
      } else if (
        !UserSavedTalent?.savedTalents
          .map((talent) => talent.talentProfileId)
          .includes(data.id)
      ) {
        // If UserSavedTalents exist but savedTalents ID not found, update it
        await updateSavedTalents([data.id]);
      } else {
        // If UserSavedTalent's savedTalent ID exists already, delete it
        await removeSavedTalents([data.id]);
      }

      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error favouriting talents",
        description: error.message,
        variant: "destructive",
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
  }, [loading]);

  useEffect(() => {
    getSavedTalents();
    fetchUserSavedTalent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getSavedTalents, isSaving]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Card className="w-[165px] drop-shadow transition-all sm:w-[230px]">
      <div
        className="w-full cursor-pointer"
        onClick={() => {
          router.push(`/profile/${id}`);
        }}
      >
        <div className="relative h-[130px] w-full sm:h-[150px]">
          <Image
            src={image}
            alt={"image"}
            fill
            className="rounded-t-lg object-cover"
          />
          <Checkbox
            className="absolute right-0 m-2 bg-white"
            checked={selectedTalentId?.includes(data.id)}
            onCheckedChange={(checked) => {
              return checked
                ? setSelectedTalentId((prev: string[]) => [...prev, data.id, ,])
                : setSelectedTalentId(
                    selectedTalentId?.filter((value) => value !== data.id),
                  );
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
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
      </div>
      <CardFooter className="flex flex-col items-start bg-secondary p-2">
        <button
          className="px-2 pb-2"
          onClick={onSave}
          disabled={loading || isSaving}
        >
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

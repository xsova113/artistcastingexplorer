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
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { TalentProfileType } from "@/types/talentProfileType";
import {
  City,
  Location,
  Province,
  SavedByUser,
  SavedTalent,
  UserSavedTalent,
} from "@prisma/client";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { saveTalentByUser } from "./saveTalentByUser";
import { toast } from "sonner";
import { removeTalentByUser } from "@/actions/removeTalentByUser";
import { fetchSavedByUser } from "@/actions/fetchSavedByUser";
import { useContactModalStore } from "@/hooks/useContactModalStore";
import useSignInAlertStore from "@/hooks/useSignInAlertStore";
import { useAuth } from "@clerk/nextjs";
import useMediaQuery from "@/hooks/useMediaQuery";

interface TalentCardProps {
  name: string;
  stageName: string | null;
  title: string;
  location: Location;
  ageMin: number | null;
  ageMax: number | null;
  image: string;
  id: string;
  discoverSection?: boolean;
  data: TalentProfileType;
  userId?: string | null;
  isSaving?: boolean;
  setIsSaving?: (loading: boolean) => void;
  setSelectedTalentId: (value: any) => void;
  selectedTalentId?: string[];
  savedByUsers?: SavedByUser[];
  email: string;
}

export type UserSavedTalentType = UserSavedTalent & {
  savedTalents: SavedTalent[];
};

const TalentCard = ({
  image,
  location,
  name,
  title,
  stageName,
  id,
  data,
  isSaving,
  userId,
  setSelectedTalentId,
  discoverSection,
  email,
  selectedTalentId,
}: TalentCardProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 640px)");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [savedByUsers, setSavedByUsers] = useState<SavedByUser[]>();
  const router = useRouter();
  const { setTalent, setOpen } = useContactModalStore();
  const { onOpen } = useSignInAlertStore();
  const { isSignedIn } = useAuth();

  const fetchSavedTalents = useCallback(async () => {
    const savedByUser = await fetchSavedByUser(id);
    setSavedByUsers(savedByUser);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isSaving, loading]);

  useEffect(() => {
    fetchSavedTalents();
  }, [fetchSavedTalents]);

  const onSave = async () => {
    try {
      setLoading(true);

      if (!userId) {
        return toast.error("Please login to save a talent");
      }

      if (!selectedTalentId) return toast.error("No talents selected");

      if (!savedByUsers?.map((user) => user.userId).includes(userId)) {
        const response = await saveTalentByUser({ talentIds: [data.id] });
        toast.success(response.message);
      } else {
        const response = await removeTalentByUser({ talentIds: [data.id] });
        toast.success(response.message);
      }

      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Card
      className={cn(
        "w-[165px] overflow-hidden drop-shadow transition-all sm:w-[230px]",
      )}
    >
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
          {!discoverSection && (
            <Checkbox
              className="absolute right-0 m-2 bg-white"
              checked={selectedTalentId?.includes(data.id)}
              onCheckedChange={(checked) => {
                return checked
                  ? setSelectedTalentId((prev: string[]) => [
                      ...prev,
                      data.id,
                      ,
                    ])
                  : setSelectedTalentId(
                      selectedTalentId?.filter((value) => value !== data.id),
                    );
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          )}
        </div>

        <CardHeader className="p-2">
          <CardTitle className="text-md sm:text-lg">
            {stageName ? stageName : name}
          </CardTitle>
          <CardDescription className="capitalize">
            {title.toLowerCase().replaceAll("_", " ")}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 py-1 max-sm:text-xs">
          <p className="capitalize">
            {location?.city !== "OTHER_PROVINCE"
              ? location.city.toLocaleLowerCase().replaceAll("_", " ")
              : location.province?.toLocaleLowerCase().replaceAll("_", " ")}
          </p>
        </CardContent>
      </div>
      <CardFooter
        className={cn(
          "flex flex-col items-start justify-center bg-secondary p-2",
          isLargeScreen && "flex-row-reverse items-center justify-end",
        )}
      >
        <button
          className={cn("px-2 max-sm:pb-2", isLargeScreen && "ml-auto")}
          onClick={onSave}
          disabled={loading || isSaving}
        >
          <Heart
            size={20}
            className={cn(
              savedByUsers?.map((user) => user.userId).includes(userId!) &&
                "fill-red-500 text-red-500",
              loading && "scale-75",
              "transition hover:opacity-50",
            )}
          />
        </button>
        <div className="flex items-center gap-x-2">
          <Button
            className={cn("max-sm:text-xs", buttonVariants({ size: "sm" }))}
            onClick={() => {
              if (!isSignedIn) return onOpen();
              setOpen(true);
              setTalent({ name, email });
            }}
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

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
import { TalentProfileType } from "@/types/talentProfileType";
import { Location, SavedTalent, UserSavedTalent } from "@prisma/client";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useContactModalStore } from "@/hooks/useContactModalStore";
import useSignInAlertStore from "@/hooks/useSignInAlertStore";
import { useAuth } from "@clerk/nextjs";
import useMediaQuery from "@/hooks/useMediaQuery";
import { onLike } from "@/actions/likesAction";

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
  setSelectedTalentId: (value: any) => void;
  selectedTalentId?: string[];
  email: string;
  likes: string[];
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
  userId,
  email,
  likes,
}: TalentCardProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 640px)");
  const [isMounted, setIsMounted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { setTalent, setOpen } = useContactModalStore();
  const { onOpen } = useSignInAlertStore();
  const { isSignedIn } = useAuth();
  const [likesArray, setLikesArray] = useState<string[] | undefined>(likes);

  const onSave = async () => {
    if (!userId) return toast.error("You are not logged in.");
    try {
      setIsPending(true);
      let newLikes = [...(likesArray || [])];
      const hasLiked = newLikes.includes(userId);

      if (hasLiked) {
        newLikes = newLikes.filter((id) => id !== userId);
        toast.success("Talent unsaved");
      } else {
        newLikes.push(userId);
        toast.success("Talent saved");
      }

      setLikesArray(newLikes);
      await onLike({ talentId: id, likesArray: newLikes });

      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
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
        role="link"
        onClick={() => {
          router.push(`/profile/${id}`);
        }}
        className="relative h-[130px] w-full cursor-pointer bg-primary-foreground sm:h-[150px]"
      >
        <Image
          src={image}
          alt={"image"}
          fill
          className="rounded-t-lg object-scale-down"
        />
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
      <CardFooter
        className={cn(
          "flex flex-col items-start justify-center bg-secondary p-2",
          isLargeScreen && "flex-row-reverse items-center justify-end",
        )}
      >
        <button
          className={cn("px-2 max-sm:pb-2", isLargeScreen && "ml-auto")}
          onClick={onSave}
          disabled={isPending}
        >
          <Heart
            size={20}
            className={cn(
              "transition",
              userId
                ? likesArray?.includes(userId) && "fill-red-500 text-red-500"
                : "",
              { "scale-75": isPending },
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

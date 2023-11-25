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
import {
  Location,
  SavedByUser,
  SavedTalent,
  UserSavedTalent,
} from "@prisma/client";
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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getLikes, onLike } from "@/actions/likesAction";

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
  email: string;
  // likes: string[];
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
  isSaving,
  userId,
  email, // likes,
}: TalentCardProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 640px)");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { setTalent, setOpen } = useContactModalStore();
  const { onOpen } = useSignInAlertStore();
  const { isSignedIn } = useAuth();
  const { data: likes } = useQuery({
    // queryKey: ["savedLikes", id],
    queryFn: () => getLikes({ talentId: id }),
  });
  const [likesArray, setLikesArray] = useState<string[] | undefined>(likes);
  const queryClient = useQueryClient();

  const { mutate: likeTalent, isLoading } = useMutation({
    mutationFn: ({
      talentId,
      likesArray,
    }: {
      talentId: string;
      likesArray: string[];
    }) => onLike({ talentId, likesArray }),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["savedLikes", id] });
    },
  });

  const onSave = () => {
    if (!userId) return toast.error("You are not logged in.");

    try {
      let newLikes = [...(likesArray || [])];
      const hasLiked = newLikes.includes(userId);

      if (hasLiked) {
        newLikes = newLikes.filter((id) => id !== userId);
      } else {
        newLikes.push(userId);
      }

      setLikesArray(newLikes);
      likeTalent({ talentId: id, likesArray: newLikes });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // const fetchSavedTalents = useCallback(async () => {
  //   const savedByUser = await fetchSavedByUser(id);
  //   setSavedByUsers(savedByUser);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [id, isSaving, loading]);

  // useEffect(() => {
  //   fetchSavedTalents();
  // }, [fetchSavedTalents]);

  // const onSave = async () => {
  //   if (!userId) return toast.error("Please login to save a talent");

  //   if (selectSavedTalents?.includes(id)) {
  //     setSelectSavedTalents((cur: string[]) =>
  //       cur.filter((value) => value !== id),
  //     );
  //   } else {
  //     setSelectSavedTalents((cur: string[]) => [...cur, id]);
  //   }

  //   try {
  //     setLoading(true);

  //     // if (!selectedTalentId) return toast.error("No talents selected");

  //     if (!savedByUsers?.map((user) => user.userId).includes(userId)) {
  //       const response = await saveTalentByUser({ talentIds: [id] });
  //       toast.success(response.message);
  //     } else {
  //       const response = await removeTalentByUser({ talentIds: [id] });
  //       toast.success(response.message);
  //     }

  //     router.refresh();
  //   } catch (error: any) {
  //     toast.error(error.message);
  //   } finally {
  //     setLoading(false);
  //     setTimeout(() => {
  //       setSelectSavedTalents([]);
  //     }, 1000);
  //   }
  // };

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
          disabled={isLoading || isSaving}
        >
          <Heart
            size={20}
            className={cn(
              userId
                ? likesArray?.includes(userId) && "fill-red-500 text-red-500"
                : "",
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

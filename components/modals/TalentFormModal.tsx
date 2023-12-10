import TalentForm from "@/app/(main)/(routes)/talent-form/_components/TalentForm";
import { buttonVariants } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { TalentProfileType } from "@/types/talentProfileType";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";

interface TalentFormModalProps {
  talentUser: User;
  talent: TalentProfileType;
}

const TalentFormModal = ({ talent, talentUser }: TalentFormModalProps) => {
  const { userId, orgRole } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        className={cn(
          "w-fit",
          userId !== talentUser.id && orgRole !== "admin" && "hidden",
          buttonVariants({
            size: "sm",
            className:
              "bg-secondary text-muted-foreground hover:bg-secondary/80",
          }),
        )}
      >
        Edit Profile
      </AlertDialogTrigger>
      <AlertDialogContent className="h-5/6 min-w-[70%] overflow-y-scroll">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Profile</AlertDialogTitle>
          <TalentForm talent={talent} setOpen={setOpen} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TalentFormModal;

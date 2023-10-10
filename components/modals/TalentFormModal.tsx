import TalentForm from "@/app/(main)/(routes)/talent-form/components/TalentForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { TalentProfileType } from "@/types/talentProfileType";
import { cn } from "@/lib/utils";

interface TalentFormModalProps {
  talentUser: User;
  talent: TalentProfileType;
}

const TalentFormModal = ({ talent, talentUser }: TalentFormModalProps) => {
  const { userId, orgRole } = useAuth();

  return (
    <Dialog>
      <DialogTrigger
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
      </DialogTrigger>
      <DialogContent className="h-5/6 min-w-[70%] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <TalentForm talent={talent} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TalentFormModal;

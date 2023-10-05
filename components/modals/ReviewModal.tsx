"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useReviewStore } from "@/hooks/useReviewStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { approveTalent, rejectTalent } from "@/actions/reviewTalent";
import { toast } from "@/components/ui/use-toast";

const ReviewModal = () => {
  const { isOpen, onClose, type, talentId } = useReviewStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onApprove = async () => {
    try {
      setIsLoading(true);
      await approveTalent(talentId);

      toast({ title: "Approved", description: "Talent has been approved!" });
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onReject = async () => {
    try {
      setIsLoading(true);
      await rejectTalent(talentId);

      toast({ title: "Rejected", description: "Talent has been rejected!" });
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog onOpenChange={onClose} open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type === "reject"
              ? "Are you absolutely sure?"
              : "Are you sure you want to approve?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type === "reject"
              ? "This action will reject talent profile's submission."
              : "This action will approve talent profile's submission."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={type === "approve" ? onApprove : onReject}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ReviewModal;

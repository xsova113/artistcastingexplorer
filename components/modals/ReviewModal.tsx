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
import { toast } from "sonner";

const ReviewModal = () => {
  const { isOpen, onClose, type, talentIds } = useReviewStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onApprove = async () => {
    setIsLoading(true);
    const promise = approveTalent(talentIds);

    toast.promise(promise, {
      success: "Talent has been approved",
      loading: "Approving...",
      error: "Oops! Failed to approve...",
      finally: () => {
        setIsLoading(false);
        router.refresh(); 
      },
    });
  };

  const onReject = async () => {
    setIsLoading(true);
    const promise = rejectTalent(talentIds);

    toast.promise(promise, {
      success: "Talent has been rejected",
      loading: "Rejecting...",
      error: "Oops! Failed to reject...",
      finally: () => {
        setIsLoading(false);
        router.refresh();
      },
    });
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
        <AlertDialogFooter className="flex items-baseline">
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

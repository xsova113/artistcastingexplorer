"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { checkSubscription } from "@/lib/subscription";
import { ToastAction } from "../ui/toast";
import { useAuth } from "@clerk/nextjs";
import { createSavedFilter } from "@/actions/createSavedFilter";
import { useState } from "react";
import checkTalent from "@/lib/checkTalent";

const CreateSavedFilterModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [name, setName] = useState("Filter 1");
  const pathname = usePathname();
  const queryPathname = pathname + location.search;

  const handleClick = async () => {
    const isPremium = await checkSubscription();
    const isTalent = await checkTalent();

    try {
      setLoading(true);

      if (!isPremium && !isTalent) {
        return toast({
          title: "Premium feature",
          description: "Subscribe to premium plan for this feature.",
          action: (
            <ToastAction
              altText={"Go to subscription page"}
              onClick={() => router.push("/subscribe")}
            >
              Subscribe Now
            </ToastAction>
          ),
        });
      }

      if (!isSignedIn)
        return toast({
          title: "Not Signed In",
          description: "Please sign in to continue",
        });

      await createSavedFilter({ name, queryPathname });
      toast({
        title: "Filter Saved",
        description:
          "Filter saved successfully, you can access it in the Settings",
      });
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="outline">Save Filter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Filter Preference</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Filter Name
            </Label>
            <Input
              id="name"
              type="text"
              defaultValue="Filter 1"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick} disabled={loading}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSavedFilterModal;

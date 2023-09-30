"use client";

import Stack from "@/components/Stack";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useState } from "react";

interface ManageSubscriptionProps {
  isPremium: boolean;
}

const ManageSubscription = ({ isPremium }: ManageSubscriptionProps) => {
  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useAuth();

  const onClick = async () => {
    try {
      setLoading(true);

      if (!isSignedIn)
        return toast({
          title: "No User Found",
          description: "Please sign in to subscribe to the premium plan.",
        });

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast({ title: "Something went wrong", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack className="gap-2">
      <h1 className="text-xl font-medium">Subscription</h1>
      <p className="text-muted-foreground">
        You are currently on <b>{isPremium ? "premium plan" : "free plan"}</b>.
      </p>
      <Button
        onClick={onClick}
        disabled={loading}
        className={cn(
          "w-fit",
          !isPremium && "bg-gradient-to-tr from-violet-500 to-red-500",
        )}
      >
        {isPremium ? "Manage Subscription" : "Subscribe to Premium"}
      </Button>
    </Stack>
  );
};

export default ManageSubscription;

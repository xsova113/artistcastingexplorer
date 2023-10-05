"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import useSignInAlertStore from "@/hooks/useSignInAlertStore";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Star } from "lucide-react";
import { useState } from "react";

const PremiumCard = ({ isPremium }: { isPremium: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useUser();
  const onOpen = useSignInAlertStore((state) => state.onOpen);

  const onSubscribe = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error: any) {
      console.log(error);

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
    <Card className="mb-4 h-[400px] flex-1 bg-primary">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-white md:text-4xl">
          {isPremium ? (
            "Subscribed"
          ) : (
            <div>
              $20 /<span className="text-lg">mo</span>
            </div>
          )}
        </CardTitle>
        <CardDescription className="text-slate-200">
          {isPremium
            ? "Manage your subscription plan"
            : "Subscribe to premium plan for additional features"}
        </CardDescription>
      </CardHeader>
      <Separator className="mx-auto mb-8 h-1 w-1/3 bg-secondary" />
      <div className="flex h-[250px] flex-col">
        <CardContent className="text-white">
          <ol className="space-y-4">
            <li className="flex items-center gap-2">
              <Star />
              Sorting and filtering
            </li>
            <li className="flex items-center gap-2">
              <Star />
              Save fitler for reusability
            </li>
          </ol>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button
            className="mx-auto w-full px-8 font-semibold uppercase"
            onClick={isSignedIn ? onSubscribe : onOpen}
            disabled={isLoading}
            variant={"outline"}
          >
            {isPremium ? "Manage Subscription" : "Subscribe"}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PremiumCard;

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
import useSignInAlertStore from "@/store/SignInAlertStore";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Star } from "lucide-react";
import { useState } from "react";

const PremiumCard = () => {
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
        <CardTitle className="text-white cursor-pointer text-3xl md:text-4xl font-bold">
          $20 /<span className="text-lg">mo</span>
        </CardTitle>
        <CardDescription className="text-slate-200">
          Subscribe to premium plan for additional features
        </CardDescription>
      </CardHeader>
      <Separator className="bg-secondary h-1 mb-8 w-1/3 mx-auto" />
      <div className="flex flex-col h-[250px]">
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
            className="uppercase rounded-full font-semibold mx-auto px-8"
            onClick={isSignedIn ? onSubscribe : onOpen}
            disabled={isLoading}
            variant={"outline"}
          >
            Subscribe
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PremiumCard;

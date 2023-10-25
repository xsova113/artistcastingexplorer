"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface DiscoverCardProps {
  title: string;
  image: string;
  description: string;
}

const DiscoverCard = ({ image, title, description }: DiscoverCardProps) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push("/directory")}
      className="drop-shadow md:w-[290px] w-11/12 mx-auto border-none transition-all cursor-pointer"
    >
      <div className="relative w-full h-[200px]">
        <Image
          src={image}
          alt={"image"}
          loading="lazy"
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <CardHeader>
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default DiscoverCard;

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
import Image from "next/image";
import Link from "next/link";

interface TalentCardProps {
  name: string;
  title: string;
  location: string;
  age: number;
  image: string;
}

const TalentCard = ({ age, image, location, name, title }: TalentCardProps) => {
  return (
    <Card className="drop-shadow w-[165px] sm:w-[230px] transition-all">
      <div className="relative w-full h-[130px] sm:h-[150px]">
        <Image
          src={image}
          alt={"image"}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>

      <CardHeader className="p-2">
        <CardTitle className="text-md sm:text-lg">{name}</CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent className="px-2 py-1 max-sm:text-xs">
        <p>{location}</p>
        <p>Age: {age}</p>
      </CardContent>
      <CardFooter className="gap-x-2 p-2 bg-secondary">
        <Button size={"sm"} className="max-sm:text-xs">
          Contact
        </Button>
        <Link
          href={`/directory/talentId`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "max-sm:text-xs"
          )}
        >
          Detail
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TalentCard;

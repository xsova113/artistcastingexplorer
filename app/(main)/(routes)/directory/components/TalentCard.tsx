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
    <Card className="drop-shadow w-[250px]">
      <div className="relative w-full h-[150px]">
        <Image
          src={image}
          alt={"image"}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>

      <CardHeader className="p-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent className="p-2 text-sm">
        <p>{location}</p>
        <p>Age: {age}</p>
      </CardContent>
      <CardFooter className="gap-x-2 p-2">
        <Button size={"sm"}>Contact</Button>
        <Link
          href={`/directory/talentId`}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          Detail
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TalentCard;

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

const mockData = {
  name: "George",
  title: "Actor",
  location: "Vancouver, BC",
  Age: 28,
  image: "/hero.jpg",
};

const TalentCard = () => {
  return (
    <Card className="drop-shadow w-[280px]">
      <div className="relative w-full h-[200px]">
        <Image
          src={mockData.image}
          alt={"image"}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>

      <CardHeader>
        <CardTitle>{mockData.name}</CardTitle>
        <CardDescription>{mockData.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{mockData.location}</p>
        <p>Age: {mockData.Age}</p>
      </CardContent>
      <CardFooter className="gap-x-2">
        <Button className="w-24">Contact</Button>
        <Link
          href={`/directory/talentId`}
          className={cn(buttonVariants({ variant: "outline" }), "w-24")}
        >
          Detail
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TalentCard;

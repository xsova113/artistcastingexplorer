import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface DirectoryCardProps {
  image: string;
  title: string;
  description: string;
}

const DirectoryCard = ({ description, image, title }: DirectoryCardProps) => {
  return (
    <Card
      className={
        "hover:p-2 transition-all drop-shadow-lg w-full h-[400px] relative bg-transparent border-none flex flex-col justify-end"
      }
    >
      <div className="absolute w-full h-[400px] -z-10">
        <Image
          src={image}
          alt={"image"}
          fill
          className="object-cover opacity-80"
        />
      </div>
      <CardHeader className="text-white gap-y-4">
        <CardTitle className="">{title}</CardTitle>
        <CardDescription className="text-white">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link
          href={"#"}
          className={cn(
            buttonVariants(),
            "rounded-full bg-white hover:bg-slate-800 text-slate-800 hover:text-slate-100 font-semibold tracking-wider px-8"
          )}
        >
          Discover
        </Link>
      </CardFooter>
      <div className="bg-primary absolute w-full inset-0 -z-20" />
    </Card>
  );
};

export default DirectoryCard;

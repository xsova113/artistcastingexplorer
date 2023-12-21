import { TopNews } from "@/types/topnews";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface TopNewsCardProps {
  item: TopNews;
}

export const TopNewsCard = ({ item }: TopNewsCardProps) => {
  return (
    <Link
      href={item.link}
      key={item.title + item.link}
      className="flex flex-col gap-y-5 rounded-2xl border p-3 shadow-lg"
    >
      <h2 className="rounded-lg bg-sky-900 p-3 text-xl font-medium text-white/90 drop-shadow">
        {item.title}
      </h2>
      <div className="flex flex-col">
        <p className="line-clamp-4 text-sm text-muted-foreground text-neutral-700">
          {item.summary}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{item.source}</span>
        <span className="flex items-center text-sm font-bold">
          Read more <ArrowRight className="ml-1.5 h-4 w-4" />
        </span>
      </div>
    </Link>
  );
};

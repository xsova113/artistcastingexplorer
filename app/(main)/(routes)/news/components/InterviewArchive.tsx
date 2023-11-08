import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/types/category";

interface InterviewArchiveProps {
  categories: Category[];
  handleClick: (value: string) => void;
  isMobile?: boolean;
}

const InterviewArchive = ({
  categories,
  handleClick,
  isMobile,
}: InterviewArchiveProps) => {
  return (
    <div
      className={cn(
        "flex-col md:ml-auto md:flex md:pr-10 md:pt-16",
        isMobile ? "block" : "hidden",
      )}
    >
      <h2 className="text-lg font-semibold underline underline-offset-4">
        Archives
      </h2>
      <article className="mt-6 flex flex-col items-center gap-x-4 md:items-start">
        <div className="flex flex-wrap items-start gap-4 md:flex-col">
          {categories
            .filter((category) => category.slug !== "news")
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((category) => (
              <Button
                key={category.id}
                onClick={() => handleClick(category.slug)}
                variant={"link"}
                className="p-0 font-semibold text-muted-foreground"
              >
                {category.name} ({category.count})
              </Button>
            ))}
        </div>
      </article>
    </div>
  );
};

export default InterviewArchive;

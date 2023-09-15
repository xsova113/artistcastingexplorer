import { cn } from "@/lib/utils";

interface FlexBetweenProps {
  children: React.ReactNode;
  className?: string;
}

const FlexBetween = ({ children, className }: FlexBetweenProps) => {
  return (
    <div className={cn("flex w-full justify-between items-center", className)}>
      {children}
    </div>
  );
};

export default FlexBetween;

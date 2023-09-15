import { cn } from "@/lib/utils";

interface StackProps {
  children: React.ReactNode;
  className?: string;
}

const Stack = ({ children, className }: StackProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export default Stack;

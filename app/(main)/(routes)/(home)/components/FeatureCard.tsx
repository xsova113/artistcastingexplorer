import Stack from "@/components/Stack";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ Icon, description, title }: ServiceCardProps) => {
  return (
    <Stack className="items-center gap-4 w-80">
      <div className="rounded-full border-2 border-primary p-5">
        <Icon size={28} className="text-primary" />
      </div>
      <h1 className="text-lg font-semibold text-muted-foreground">{title}</h1>
      <p className="w-5/6 self-center text-center text-sm text-muted-foreground">
        {description}
      </p>
    </Stack>
  );
};

export default FeatureCard;

import Stack from "@/components/Stack";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const ServiceCard = ({ Icon, description, title }: ServiceCardProps) => {
  return (
    <Stack className="gap-4 items-center">
      <div className="border-2 border-primary p-5 rounded-full">
        <Icon size={28} className="text-primary" />
      </div>
      <h1 className="text-lg font-semibold text-muted-foreground">{title}</h1>
      <p className="w-4/5 text-center text-sm text-muted-foreground">
        {description}
      </p>
    </Stack>
  );
};

export default ServiceCard;

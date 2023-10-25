import { LucideIcon } from "lucide-react";

interface PerkItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PerkItem = ({ description, icon: Icon, title }: PerkItemProps) => {
  return (
    <div className="flex gap-4 w-full">
      <div className="rounded-md bg-primary p-2 h-fit text-white">
        <Icon size={18} />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="w-full text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default PerkItem;

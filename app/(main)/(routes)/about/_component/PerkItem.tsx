import { LucideIcon } from "lucide-react";

interface PerkItemProps {
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
}

const PerkItem = ({ description, icon: Icon, title }: PerkItemProps) => {
  return (
    <div className="flex w-full gap-4">
      <div className="h-fit rounded-md bg-primary p-2 text-white">
        <Icon size={18} />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-lg font-semibold">{title}</h1>
        {description}
      </div>
    </div>
  );
};

export default PerkItem;

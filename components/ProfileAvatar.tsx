import {
  Avatar as Ava,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarProps {
  image: string;
  fallback?: string;
  className?: string;
}

const ProfileAvatar = ({ image, fallback, className }: AvatarProps) => {
  return (
    <Ava className={cn(className)}>
      <AvatarImage src={image} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Ava>
  );
};

export default ProfileAvatar;

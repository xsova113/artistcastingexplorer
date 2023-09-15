import {
  Avatar as Ava,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface AvatarProps {
  image: string;
  fallback?: string;
}

const ProfileAvatar = ({ image, fallback }: AvatarProps) => {
  return (
    <Ava>
      <AvatarImage src={image} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Ava>
  );
};

export default ProfileAvatar;

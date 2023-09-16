import { cn } from "@/lib/utils";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useAuth,
  useUser,
} from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";
import Link from "next/link";

interface UserMenuProps {
  isLargeScreen?: boolean;
  className?: string;
}

const UserMenu = ({ isLargeScreen, className }: UserMenuProps) => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "w-fit",
          className,
          isLargeScreen &&
            "lg:flex hidden items-center gap-2 border p-1 px-2 rounded-full "
        )}
      >
        {isLargeScreen ? (
          <>
            <Menu />
            <ProfileAvatar
              image={user ? user?.imageUrl[0] : "/user_placeholder.jpg"}
              className="h-8 w-8"
            />
          </>
        ) : (
          "My Account"
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="lg:mr-10 ml-10">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isSignedIn ? (
          <>
            <DropdownMenuItem>
              <Link href={"/profile"}>Edit Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={"/settings"}>Subscription</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem>
              <SignInButton />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignUpButton />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;

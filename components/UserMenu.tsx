import { cn } from "@/lib/utils";
import {
  RedirectToUserProfile,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  UserProfile,
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
            "hidden items-center gap-2 rounded-full border p-1 px-3 lg:flex ",
        )}
      >
        {isLargeScreen ? (
          <>
            <Menu size={20} />
            <ProfileAvatar
              image={user ? user?.imageUrl[0] : "/user_placeholder.jpg"}
              className="h-7 w-7"
            />
          </>
        ) : (
          "My Account"
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-10 lg:mr-10">
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

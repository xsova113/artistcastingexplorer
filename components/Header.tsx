"use client";

import FlexBetween from "./FlexBetween";
import Link from "next/link";
import MobileHeader from "./MobileHeader";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton, SignInButton, useAuth } from "@clerk/clerk-react";
import { Button, buttonVariants } from "./ui/button";
import useSignInAlertStore from "@/hooks/useSignInAlertStore";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const routes = [
  { name: "home", pathname: "/" },
  { name: "directory", pathname: "/directory" },
  { name: "news", pathname: "/news" },
  { name: "interviews", pathname: "/interviews" },
  { name: "subscribe", pathname: "/subscribe" },
  { name: "contact", pathname: "/contact" },
  { name: "settings", pathname: "/settings" },
];

const Header = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  const { isAuthenticated } = useConvexAuth();
  const { onOpen } = useSignInAlertStore();
  const router = useRouter();
  const profiles = useQuery(api.profile.get);

  const profile = profiles?.find((p) => p.userId === userId);

  return (
    <header className="bg-slate-50 shadow">
      <FlexBetween className="px-4 py-4">
        <Logo />
        <nav className="hidden gap-4 text-sm lg:flex">
          {routes.map((route) => (
            <Link
              className={cn(
                "rounded-md p-2 capitalize transition hover:bg-secondary",
                pathname === route.pathname && "rounded-md bg-secondary",
              )}
              key={route.name}
              href={route.pathname}
            >
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {!profile ? (
            <Button
              className="hidden bg-gradient-to-tr from-violet-500 to-red-500 font-semibold transition hover:scale-105 lg:flex"
              onClick={() => (!isAuthenticated ? onOpen() : router.push('/talent-form'))}
              size={"sm"}
            >
              Become Talent
            </Button>
          ) : (
            isAuthenticated && (
              <Link
                href={`/profile/${profile?._id}`}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    className: "hidden font-semibold lg:flex",
                    size: "sm",
                  }),
                )}
              >
                Profile
              </Link>
            )
          )}
          {isAuthenticated ? (
            <UserButton afterSignOutUrl="/sign-in" />
          ) : (
            <SignInButton mode="modal">
              <Button variant={"outline"} size={"sm"}>
                Sign in
              </Button>
            </SignInButton>
          )}
          <MobileHeader routes={routes} talent={profile} />
        </div>
      </FlexBetween>
    </header>
  );
};

export default Header;

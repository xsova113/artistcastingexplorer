"use client";

import FlexBetween from "./FlexBetween";
import Link from "next/link";
import MobileHeader from "./MobileHeader";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton, useAuth, useUser } from "@clerk/nextjs";
import { Button, buttonVariants } from "./ui/button";
import useSignInAlertStore from "@/hooks/useSignInAlertStore";
import checkTalent from "@/lib/checkTalent";
import { useEffect, useState } from "react";
import { TalentProfile } from "@prisma/client";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";

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
  const { isSignedIn } = useAuth();
  const { onOpen } = useSignInAlertStore();
  const [talent, setTalent] = useState<TalentProfile>();
  const show = useScrollTrigger();
  const router = useRouter();

  const checkIsTalent = async () => {
    const talent = await checkTalent();
    setTalent(talent);
  };

  useEffect(() => {
    checkIsTalent();
  }, [isSignedIn]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full bg-slate-50 shadow transition duration-500",
        !show && "-translate-y-28",
      )}
    >
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
          {!talent ? (
            <Button
              className={
                "hidden bg-gradient-to-tr from-violet-500 to-red-500 font-semibold transition hover:scale-105 lg:flex"
              }
              size={"sm"}
              onClick={() => {
                !isSignedIn ? onOpen() : router.push("/talent-form");
              }}
            >
              Become Talent
            </Button>
          ) : (
            isSignedIn && (
              <Link
                href={`/profile/${talent.id}`}
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
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <Button size={"sm"} variant={"outline"}>
                Sign in
              </Button>
            </SignInButton>
          )}
          <MobileHeader routes={routes} talent={talent} />
        </div>
      </FlexBetween>
    </header>
  );
};

export default Header;

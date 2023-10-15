"use client";

import FlexBetween from "./FlexBetween";
import Link from "next/link";
import MobileHeader from "./MobileHeader";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton, useAuth } from "@clerk/nextjs";
import { buttonVariants } from "./ui/button";
import useSignInAlertStore from "@/hooks/useSignInAlertStore";
import checkTalent from "@/lib/checkTalent";
import { useEffect, useState } from "react";
import { TalentProfile } from "@prisma/client";
import { useConvexAuth } from "convex/react";

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
  const { isAuthenticated } = useConvexAuth();
  const { onOpen } = useSignInAlertStore();
  const [talent, setTalent] = useState<TalentProfile>();

  const checkIsTalent = async () => {
    const talent = await checkTalent();
    setTalent(talent);
  };

  useEffect(() => {
    checkIsTalent();
  }, [isAuthenticated]);

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
          {!talent ? (
            <Link
              href={!isAuthenticated ? "/sign-in" : "/talent-form"}
              className={cn(
                buttonVariants({
                  className:
                    "hidden bg-gradient-to-tr from-violet-500 to-red-500 font-semibold transition hover:scale-105 lg:flex",
                  size: "sm",
                }),
              )}
              onClick={() => !isAuthenticated && onOpen()}
            >
              Become Talent
            </Link>
          ) : (
            isAuthenticated && (
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
          {isAuthenticated ? (
            <UserButton afterSignOutUrl="/sign-in" />
          ) : (
            <Link
              href={"/sign-in"}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Sign in
            </Link>
          )}
          <MobileHeader routes={routes} talent={talent} />
        </div>
      </FlexBetween>
    </header>
  );
};

export default Header;

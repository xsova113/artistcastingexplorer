"use client";

import FlexBetween from "./FlexBetween";
import Link from "next/link";
import MobileHeader from "./MobileHeader";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton, useAuth } from "@clerk/nextjs";
import { buttonVariants } from "./ui/button";
import { User } from "lucide-react";
import useSignInAlertStore from "@/store/SignInAlertStore";
import checkTalent from "@/lib/checkTalent";
import { useEffect, useState } from "react";
import { TalentProfile } from "@prisma/client"

const routes = [
  { name: "home", pathname: "/" },
  { name: "directory", pathname: "/directory" },
  { name: "news", pathname: "/news" },
  { name: "interviews", pathname: "/interviews" },
  { name: "subscribe", pathname: "/subscribe" },
  { name: "contact", pathname: "/contact" },
];

const Header = () => {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const { onOpen } = useSignInAlertStore();
  const [talent, setTalent] = useState<TalentProfile>();

  const checkIsTalent = async () => {
    const talent = await checkTalent();
    setTalent(talent);
  };

  useEffect(() => {
    checkIsTalent();
  }, [isSignedIn]);

  return (
    <header className="shadow">
      <FlexBetween className="px-4 py-4">
        <Logo />
        <nav className="hidden gap-4 lg:flex">
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
              href={!isSignedIn ? "/sign-in" : "/talent-form"}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  className: "hidden font-semibold lg:flex",
                }),
              )}
              onClick={() => !isSignedIn && onOpen()}
            >
              Become Talent
            </Link>
          ) : (
            isSignedIn && (
              <Link
                href={`/profile/${talent.id}`}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    className: "hidden font-semibold lg:flex",
                  }),
                )}
              >
                Talent Profile
              </Link>
            )
          )}

          {isSignedIn ? (
            <UserButton afterSignOutUrl="/sign-in" />
          ) : (
            <Link href={"/sign-in"} className={"rounded-full bg-primary p-2"}>
              <User size={20} className="text-white" />
            </Link>
          )}
          <MobileHeader routes={routes} talent={talent} />
        </div>
      </FlexBetween>
    </header>
  );
};

export default Header;

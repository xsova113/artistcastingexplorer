"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Logo from "./Logo";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import UserMenu from "./UserMenu";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Button, buttonVariants } from "./ui/button";
import useSignInAlertStore from "@/hooks/useSignInAlertStore";
import { TalentProfile } from "@prisma/client";

interface MobileHeaderProps {
  routes: {
    name: string;
    pathname: string;
  }[];
  talent?: TalentProfile;
}

const MobileHeader = ({ routes, talent }: MobileHeaderProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const { onOpen } = useSignInAlertStore();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="lg:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <Logo />
        </SheetHeader>
        <nav className="mt-20 flex flex-col gap-1">
          {routes.map((route) => (
            <div
              key={route.name}
              className={cn(
                "rounded-md p-2 capitalize transition hover:bg-secondary",
                pathname === route.pathname && "rounded-md bg-slate-100",
              )}
            >
              <Link href={route.pathname} onClick={() => setIsOpen(false)}>
                {route.name}
              </Link>
            </div>
          ))}

          {!talent ? (
            <Button
              className={
                "mt-4 bg-gradient-to-tr from-violet-500 to-red-500 font-semibold transition hover:scale-105 lg:flex"
              }
              size={"sm"}
              onClick={() => {
                !isSignedIn ? onOpen() : router.push("/talent-form");
                setIsOpen(false);
              }}
            >
              Become Talent
            </Button>
          ) : (
            <Link
              href={`/profile/${talent.id}`}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  className: "mt-4 flex font-semibold lg:hidden",
                }),
              )}
              onClick={() => setIsOpen(false)}
            >
              Talent Profile
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;

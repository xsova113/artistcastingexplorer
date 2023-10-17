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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { buttonVariants } from "./ui/button";
import useSignInAlertStore from "@/hooks/useSignInAlertStore";
import { TalentProfile } from "@prisma/client";
import { useConvexAuth } from "convex/react";
import { Doc} from "../convex/_generated/dataModel";

interface MobileHeaderProps {
  routes: {
    name: string;
    pathname: string;
  }[];
  talent?: Doc<"profile">;
}

const MobileHeader = ({ routes, talent }: MobileHeaderProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useConvexAuth();

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
            <Link
              href={isAuthenticated ? "/talent-form" : "/sign-in"}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  className: "flex font-semibold lg:hidden",
                }),
              )}
              onClick={() => setIsOpen(false)}
            >
              Become Talent
            </Link>
          ) : (
            <Link
              href={`/profile/${talent._id}`}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  className: "flex font-semibold lg:hidden",
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

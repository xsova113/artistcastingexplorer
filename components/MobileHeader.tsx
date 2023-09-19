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
import UserMenu from "./UserMenu";
import { UserButton } from "@clerk/nextjs";
import { buttonVariants } from "./ui/button";

interface MobileHeaderProps {
  routes: {
    name: string;
    pathname: string;
  }[];
}

const MobileHeader = ({ routes }: MobileHeaderProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
          {/* <UserMenu className="p-2 hover:bg-secondary rounded-md transition" /> */}
          <Link
            href={"/profile"}
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "flex font-semibold lg:hidden",
              }),
            )}
          >
            Become Talent
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;

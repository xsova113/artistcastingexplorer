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
        <nav className="flex flex-col gap-1 mt-20">
          {routes.map((route) => (
            <div
              key={route.name}
              className={cn(
                "capitalize hover:bg-secondary transition rounded-md p-2",
                pathname === route.pathname && "bg-slate-100 rounded-md"
              )}
            >
              <Link href={route.pathname} onClick={() => setIsOpen(false)}>
                {route.name}
              </Link>
            </div>
          ))}
          <UserMenu className="p-2 hover:bg-secondary rounded-md transition" />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;

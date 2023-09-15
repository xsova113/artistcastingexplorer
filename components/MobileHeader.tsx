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

interface MobileHeaderProps {
  routes: {
    name: string;
    pathname: string;
  }[];
}

const MobileHeader = ({ routes }: MobileHeaderProps) => {
  const pathname = usePathname();

  return (
    <Sheet>
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
                "capitalize hover:bg-slate-100 transition rounded-md p-2",
                pathname === route.pathname && "bg-slate-100 rounded-md"
              )}
            >
              <Link href={route.pathname}>{route.name}</Link>
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHeader;

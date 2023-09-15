"use client";

import FlexBetween from "./FlexBetween";
import Link from "next/link";
import MobileHeader from "./MobileHeader";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

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

  return (
    <header className="shadow">
      <FlexBetween className="px-10 py-4">
        <Logo />
        <nav className="gap-8 lg:flex hidden">
          {routes.map((route) => (
            <Link
              className={cn(
                "capitalize hover:bg-secondary rounded-md transition p-2",
                pathname === route.pathname && "bg-secondary rounded-md"
              )}
              key={route.name}
              href={route.pathname}
            >
              {route.name}
            </Link>
          ))}
        </nav>
        <UserButton afterSignOutUrl="/" />
        <MobileHeader routes={routes} />
      </FlexBetween>
    </header>
  );
};

export default Header;

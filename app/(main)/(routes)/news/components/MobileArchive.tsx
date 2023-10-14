"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ArchiveIcon } from "lucide-react";

interface MobileArchiveProps {
  children: React.ReactNode;
}

const MobileArchive = ({ children }: MobileArchiveProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mb-2 flex w-fit items-center gap-2 rounded border p-1 text-sm md:hidden">
        <ArchiveIcon size={18} />
        <span>Archives</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[350px] ml-6">
        <DropdownMenuItem>{children}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileArchive;

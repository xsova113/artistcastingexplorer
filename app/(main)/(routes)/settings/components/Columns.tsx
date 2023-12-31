"use client";

import { City, Province, Role } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { removeLike } from "@/actions/likesAction";

export type SavedTalent = {
  id: string;
  name: string;
  role: Role;
  image: string;
  location: City | Province | null;
};

export const columns: ColumnDef<SavedTalent>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-inherit"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="relative h-20 w-20 overflow-hidden rounded-sm">
        <Image
          src={row.original.image}
          alt="image"
          fill
          className="object-cover transition hover:z-50"
        />
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.role.toString().toLowerCase().replaceAll("_", " ")}
      </span>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.location?.toString().toLowerCase().replaceAll("_", " ")}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const talent = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={async () => {
                await removeLike({ talentId: talent.id });
              }}
            >
              Unsave
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/profile/${talent.id}`}>View profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Contact</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

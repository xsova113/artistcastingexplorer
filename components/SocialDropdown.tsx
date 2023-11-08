"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Facebook, Link2, Linkedin, Share2, Twitter } from "lucide-react";
import Link from "next/link";
import { toast } from "./ui/use-toast";

const SocialDropdown = () => {
  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Link copied to the clipboard",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Share2 />
        Share
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            className="flex items-center gap-2"
            target="_blank"
          >
            <Facebook size={19} />
            Facebook
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
            className="flex items-center gap-2"
            target="_blank"
          >
            <Twitter size={19} />
            Twitter
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
            className="flex items-center gap-2"
            target="_blank"
          >
            <Linkedin size={19} />
            LinkedIn
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleClick}
          className="flex cursor-pointer items-center gap-2"
        >
          <Link2 size={19} />
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialDropdown;

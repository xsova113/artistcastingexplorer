"use client";

import { removeSavedFilter } from "@/actions/RemoveSavedFilter";
import Stack from "@/components/Stack";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { UserSavedFilterType } from "@/types/savedFilterType";
import { useAuth } from "@clerk/nextjs";
import { Link2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ToolTIp from "@/components/ToolTIp";

interface ManageSavedFilterProps {
  savedFilter: UserSavedFilterType | void | null;
}

const ManageSavedFilter = ({ savedFilter }: ManageSavedFilterProps) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const onRemove = async (id: string) => {
    try {
      setLoading(true);

      if (!userId)
        return toast({
          title: "No User Found",
          description: "You are not allowed to do this action",
          variant: "destructive",
        });

      await removeSavedFilter(id);

      toast({
        title: "Filter Removed",
        description: "You have removed the filter",
      });

      router.refresh();
    } catch (error: any) {
      toast({
        title: "Failed to remove",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Stack className="gap-2">
      <Stack className="gap-2">
        <h1 className="text-xl font-medium">Saved Filters</h1>
        <span className="text-muted-foreground">
          Total filters saved: {savedFilter?.savedFilters.length || 0}
        </span>
      </Stack>

      <div className="flex flex-wrap gap-4">
        {savedFilter?.savedFilters.map((filter) => (
          <div
            key={filter.id}
            className={cn(
              "flex items-center gap-2",
              buttonVariants({ variant: "outline", className: "py-7" }),
            )}
          >
            <span className="font-medium">{filter.name}</span>

            <ToolTIp
              description={"Redirect to Directory page with filtered items"}
            >
              <Button
                variant={"outline"}
                onClick={() => router.push(filter.queryPathname)}
                disabled={loading}
                size={"sm"}
              >
                <Link2 size={15} className="text-green-500" />
              </Button>
            </ToolTIp>

            <ToolTIp description="Remove this saved filter">
              <Button
                variant={"outline"}
                onClick={() => {
                  onRemove(filter.id);
                }}
                disabled={loading}
                size={"sm"}
              >
                <Trash size={15} className="text-red-500" />
              </Button>
            </ToolTIp>
          </div>
        ))}
      </div>
    </Stack>
  );
};

export default ManageSavedFilter;

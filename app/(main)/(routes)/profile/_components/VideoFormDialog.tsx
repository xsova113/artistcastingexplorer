"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { TalentProfile, Video } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { createVideo, deleteVideo, updateVideo } from "@/actions/videoAction";
import { Trash } from "lucide-react";

interface VideoFormDialogProps {
  initialData?: Video;
  talent: TalentProfile;
  children: React.ReactNode;
  className?: string;
}

const VideoFormSchema = z.object({
  videoName: z.string().min(2).max(50),
  videoUrl: z.string().min(2),
});

export type VideoFormValues = z.infer<typeof VideoFormSchema>;

const VideoFormDialog = ({
  initialData,
  talent,
  children,
  className,
}: VideoFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const { userId } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof VideoFormSchema>>({
    resolver: zodResolver(VideoFormSchema),
    defaultValues: initialData
      ? {
          videoName: initialData.name,
          videoUrl: initialData.url,
        }
      : {
          videoName: "",
          videoUrl: "",
        },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof VideoFormSchema>) => {
    try {
      if (userId !== talent.userId)
        return toast.error("You are not authorized to submit this form");

      if (!talent.id) return toast.error("Talent ID is missing...");

      if (
        initialData
          ? await updateVideo({ videoId: initialData.id, values })
          : await createVideo({ values, talentId: talent.id })
      )
        toast.success(
          initialData
            ? "You have successfully updated video"
            : "You have successfully created video",
        );
      setOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error("Failed to submit the form");
      console.log("Credit form submission error: " + error.message);
    } finally {
      if (!initialData) form.reset();
    }
  };

  const onDelete = (initialData: Video) => {
    const promise = deleteVideo({ id: initialData.id });

    toast.promise(promise, {
      success: "Video deleted successfully",
      loading: "Deleting...",
      error: "Failed to delete video",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={(e) => e.stopPropagation()}
        className={buttonVariants({
          variant: "outline",
          size: "sm",
          className: cn(talent.userId !== userId && "hidden", className),
        })}
      >
        {children}
      </DialogTrigger>
      <DialogContent className="h-2/3 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Add Production</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="videoName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Video title"
                      {...field}
                      disabled={isLoading}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Video url"
                      {...field}
                      disabled={isLoading}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                {initialData ? "Save" : "Create"}
              </Button>

              {initialData ? (
                <Button
                  className="flex items-center gap-2"
                  variant={"destructive"}
                  disabled={isLoading}
                  onClick={() => onDelete(initialData)}
                >
                  <Trash size={18} />
                </Button>
              ) : null}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default VideoFormDialog;

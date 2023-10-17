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
import { Credit, TalentProfile } from "@prisma/client";
import { createCredit, updateCredit } from "@/actions/creditAction";
import { useAuth } from "@clerk/nextjs";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CreditFormDialogProps {
  initialData?: Credit;
  talent: TalentProfile;
  children: React.ReactNode;
}

const CreditFormSchema = z.object({
  category: z.string().min(2).max(50),
  productionTitle: z.string().min(2).max(50),
  yearOfRelease: z.number(),
  role: z.string().optional(),
  numberOfEpisode: z.number(),
});

export type CreditFormValues = z.infer<typeof CreditFormSchema>;

const CreditFormDialog = ({
  initialData,
  talent,
  children,
}: CreditFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const { userId } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreditFormSchema>>({
    resolver: zodResolver(CreditFormSchema),
    defaultValues: initialData
      ? {
          category: initialData.category,
          numberOfEpisode: initialData.numberOfEpisode || undefined,
          productionTitle: initialData.productionTitle,
          role: initialData.role || undefined,
          yearOfRelease: initialData.yearOfRelease,
        }
      : {
          category: "",
          numberOfEpisode: 0,
          productionTitle: "",
          role: "",
          yearOfRelease: new Date().getFullYear() - 3,
        },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof CreditFormSchema>) => {
    try {
      if (userId !== talent.userId)
        return toast({
          title: "Failed to submit",
          description: "You are not authorized to submit the form",
          variant: "destructive",
        });

      if (!talent.id)
        return toast({
          title: "Error submitting",
          description: "Talent ID is missing",
          variant: "destructive",
        });

      if (
        initialData
          ? await updateCredit({ creditId: initialData.id, values })
          : await createCredit({ values, talentId: talent.id })
      )
        toast({
          title: "Success",
          description: "You have successfully submitted the form",
        });
      setOpen(false);
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      if (!initialData) form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={buttonVariants({
          variant: "outline",
          size: "sm",
          className: cn(talent.userId !== userId && "hidden"),
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Category"
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
              name="productionTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Production title"
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
              name="yearOfRelease"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Year of Release</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={(new Date().getFullYear() - 3).toString()}
                      type="number"
                      max={2100}
                      min={1900}
                      defaultValue={field.value}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfEpisode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Episode</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      defaultValue={field.value}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="The role you played"
                      {...field}
                      disabled={isLoading}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {initialData ? "Save" : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreditFormDialog;

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useContactModalStore } from "@/hooks/useContactModalStore";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { sendEmail } from "@/lib/sendgrid";
import { toast } from "sonner";
import { SignInButton, useUser } from "@clerk/nextjs";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  message: z.string().min(10),
});

const ContactModal = () => {
  const { isOpen, talent, setOpen } = useContactModalStore();
  const { isSignedIn, user, isLoaded } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const promise = sendEmail({
      to: [talent.email],
      subject: "User from Artist Casting Explorer sent a message",
      templateId: "d-eeedc960b4364b46800c205894c568a4",
      name: values.name,
      userEmail: user?.emailAddresses[0].emailAddress,
      message: values.message,
    });

    toast.promise(promise, {
      success: "Message sent successfully",
      loading: "Sending message...",
      error: "Failed to send message",
      finally: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact {talent.name}</DialogTitle>
          <DialogDescription>
            Fill out the form to contact {talent.name}.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {isLoaded && isSignedIn ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        ) : (
          <div>
            Please{" "}
            <SignInButton mode="modal">
              <button
                onClick={() => setOpen(false)}
                className="text-primary underline-offset-4 hover:underline"
              >
                login
              </button>
            </SignInButton>{" "}
            to your account to send talent a message.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;

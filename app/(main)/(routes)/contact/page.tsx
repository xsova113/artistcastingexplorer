"use client";

import HeroSection from "@/components/HeroSection";
import Stack from "@/components/Stack";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, Phone, Youtube } from "lucide-react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

const formSchema = z.object({
  name: z.string().min(1, { message: "This field is required" }),
  email: z.string().min(1, { message: "This field is required" }).email({
    message: "Invalid email address",
  }),
  message: z.string().min(1, { message: "This field is required" }),
});

const ContactPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
      name: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const isValid = await form.trigger();
    if (!isValid) {
      e.preventDefault();
    }
  };

  return (
    <div className="mb-32 overflow-x-clip">
      <div className="flex flex-col gap-x-32 gap-y-20 pt-20 max-md:px-12 md:flex-row md:px-20">
        {/* Contact Form  */}
        <Stack className="flex-1">
          <h1 className="mb-10 text-2xl font-semibold">Get in touch</h1>
          <Form {...form}>
            <motion.form
              variants={{
                hidden: { opacity: 0, x: -50 },
                show: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5 }}
              method="POST"
              action="https://formsubmit.co/62eeff40bd1b93c9531e63016003bbe7"
              onSubmit={onSubmit}
              className="w-full space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <motion.div
                        initial="hidden"
                        whileInView={"show"}
                        variants={{
                          hidden: { opacity: 0, x: -50 },
                          show: { opacity: 1, x: 0 },
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <Input
                          placeholder="NAME"
                          {...field}
                          disabled={isSubmitting}
                          className="bg-slate-100 dark:bg-slate-900"
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <motion.div
                        initial="hidden"
                        whileInView={"show"}
                        variants={{
                          hidden: { opacity: 0, x: -50 },
                          show: { opacity: 1, x: 0 },
                        }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <Input
                          type="email"
                          placeholder="EMAIL"
                          {...field}
                          disabled={isSubmitting}
                          className="bg-slate-100 dark:bg-slate-900"
                        />
                      </motion.div>
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
                    <FormControl>
                      <motion.div
                        initial="hidden"
                        whileInView={"show"}
                        variants={{
                          hidden: { opacity: 0, x: -50 },
                          show: { opacity: 1, x: 0 },
                        }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <Textarea
                          placeholder="MESSAGE"
                          {...field}
                          disabled={isSubmitting}
                          className="bg-slate-100 dark:bg-slate-900"
                          rows={5}
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <input
                type="hidden"
                name="_subject"
                value="New Contact Message!"
              />
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  show: { opacity: 1, x: 0 },
                }}
                initial={"hidden"}
                whileInView={"show"}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="uppercase"
                >
                  Send Message
                </Button>
              </motion.div>
            </motion.form>
          </Form>
        </Stack>

        {/* Contact Info  */}
        <motion.div
          initial="hidden"
          whileInView={"show"}
          variants={{
            hidden: { opacity: 0, x: 50 },
            show: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="flex flex-1 flex-col"
        >
          <h1 className="mb-10 text-2xl font-semibold">Contact Info</h1>
          <Stack className="gap-10">
            <Stack className="gap-2">
              <h3 className="text-lg font-semibold">Email Us</h3>
              <a
                href="mailto:info@artistcastingexplorer.com"
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Mail size={18} />
                info@artistcastingexplorer.com
              </a>
            </Stack>
            <Stack className="gap-2">
              <h3 className="text-lg font-semibold">Call Us</h3>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Phone size={18} />
                +1-788-681-6481
              </span>
            </Stack>
            <Stack className="gap-2">
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex gap-3">
                <Link href={"#"} className="rounded-full bg-primary p-2">
                  <Facebook
                    className="fill-white text-primary transition hover:scale-[135%]"
                    size={18}
                  />
                </Link>
                <Link
                  target="_blank"
                  href={
                    "https://www.instagram.com/artistcastingexplorer_?igshid=OGQ5ZDc2ODk2ZA%3D%3D"
                  }
                  className="rounded-full bg-primary p-2"
                >
                  <Instagram
                    className="fill-white text-primary transition hover:scale-[135%]"
                    size={18}
                  />
                </Link>
                <Link href={"#"} className="rounded-full bg-primary p-2">
                  <Youtube
                    className="fill-white text-primary transition hover:scale-[135%]"
                    size={18}
                  />
                </Link>
                <Link href={"#"} className="rounded-full bg-primary p-2">
                  <FaXTwitter
                    className="fill-white text-primary transition hover:scale-[135%]"
                    size={18}
                  />
                </Link>
              </div>
            </Stack>
          </Stack>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;

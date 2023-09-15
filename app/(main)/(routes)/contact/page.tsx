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
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().nonempty({ message: "This field is required" }),
  email: z
    .string()
    .nonempty({ message: "This field is required" })
    .regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, {
      message: "Invalid email address",
    }),
  message: z.string().nonempty({ message: "This field is required" }),
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
    <div className="mb-24 overflow-x-clip">
      <HeroSection
        image={
          "https://castingjapanese.ca/wp-content/uploads/2023/09/about-bg-2.jpg"
        }
        title={"Contact Us"}
      />

      <div className="flex flex-col md:flex-row md:px-20 gap-x-32 gap-y-20 max-md:px-12 pt-20">
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
              action="https://formsubmit.co/bd17236c209884c56a9ed0aac12382b7"
              onSubmit={onSubmit}
              className="space-y-8 w-full"
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
                          className="dark:bg-slate-900 bg-slate-100"
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
                          placeholder="EMAIL"
                          {...field}
                          disabled={isSubmitting}
                          className="dark:bg-slate-900 bg-slate-100"
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
                          className="dark:bg-slate-900 bg-slate-100"
                          rows={5}
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
          className="flex-1 flex flex-col"
        >
          <h1 className="mb-10 text-2xl font-semibold">Contact Info</h1>
          <Stack className="gap-10">
            <Stack className="gap-2">
              <h3 className="text-lg font-semibold">Email Us</h3>
              <span className="text-muted-foreground">
                contact@example.com​
              </span>
            </Stack>
            <Stack className="gap-2">
              <h3 className="text-lg font-semibold">Call Us</h3>
              <span className="text-muted-foreground">800-123-456</span>
            </Stack>
            <Stack className="gap-2">
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex gap-3">
                <Link href={"#"} className="rounded-full p-2 bg-primary">
                  <Facebook
                    className="hover:scale-[135%]  fill-white text-primary"
                    size={18}
                  />
                </Link>
                <Link href={"#"} className="rounded-full p-2 bg-primary">
                  <Instagram
                    className="hover:scale-[135%] transition fill-white text-primary"
                    size={18}
                  />
                </Link>
                <Link href={"#"} className="rounded-full p-2 bg-primary">
                  <Youtube
                    className="hover:scale-[135%] transition fill-white text-primary"
                    size={18}
                  />
                </Link>
                <Link href={"#"} className="rounded-full p-2 bg-primary">
                  <Twitter
                    className="hover:scale-[135%] transition fill-white text-primary"
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

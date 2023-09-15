"use client";

import Stack from "@/components/Stack";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  const mailchimpUrl = process.env.NEXT_PUBLIC_MAILCHIMP_URL as string;

  return (
    <div className="bg-slate-800">
      <div className="lg:p-16 p-10 gap-y-8 flex justify-between md:flex-row flex-col max-w-screen-xl mx-auto">
        <Stack className="flex-1 justify-between gap-y-12">
          <Stack className="gap-4">
            <h1 className="font-black text-6xl text-slate-200 uppercase">
              stay tuned
            </h1>
            <p className="text-slate-300 text-2xl w-2/3">
              Subscribe to our newsletter to hear the latest news
            </p>
          </Stack>

          <form action={mailchimpUrl} method="post" target="_blank">
            <Stack className="flex gap-6">
              <div className="flex flex-col md:flex-row gap-y-4 gap-x-4">
                <Input
                  type="text"
                  placeholder="First Name"
                  className="w-full md:w-fit"
                  defaultValue=""
                />

                <Input
                  type="email"
                  placeholder="email"
                  required
                  defaultValue=""
                  className="w-full md:w-fit"
                />
              </div>

              <Button
                type="submit"
                name="subscribe"
                className={"font-bold uppercase w-fit"}
              >
                Subscribe
              </Button>
            </Stack>
          </form>
        </Stack>
        <div className="w-full h-[300px] relative md:flex-1">
          <Image
            src={"/newsletter.jpg"}
            alt={"newsletter"}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;

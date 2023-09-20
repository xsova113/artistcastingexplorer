"use client";

import TextareaAutosize from "react-textarea-autosize";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import prisma from "@/lib/client";
import { talentFormSchema } from "@/lib/talentFormSchema";
import DobFormField from "./DobFormField";
import { City, Province } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "./FileUpload";
import MiddlenameFormField from "./MiddlenameFormField";
import FirstNameFormField from "./FirstNameFormField copy";
import LastNameFormField from "./LastNameFormField";
import EmailFormField from "./EmailFormField";
import HeightFormField from "./HeightFormField";
import AgencyFormField from "./AgencyFormField";
import CityFormField from "./CityFormField";
import ProvinceFormField from "./ProvinceFormField";
import BioFormField from "./BioFormField";
import ImagesFormField from "./ImagesFormField";
import { Separator } from "@/components/ui/separator";
import Stack from "@/components/Stack";

const TalentForm = () => {
  const { user } = useUser();

  const form = useForm<z.infer<typeof talentFormSchema>>({
    resolver: zodResolver(talentFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      agency: "",
      dob: new Date(),
      bio: "",
      bodyType: "",
      email: "",
      height: "",
      images: [],
      location: { city: City.VANCOUVER },
      middleName: "",
      stageName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof talentFormSchema>) {
    if (!user?.id) {
      return toast({
        title: "User not found",
        description: "Please login first to continue",
        variant: "destructive",
      });
    }

    try {
      await prisma.talentProfile.create({
        data: {
          ...values,
          userId: user.id,
          images: { createMany: { data: values.images } },
          location: {
            create: {
              city: values.location.city,
              province: values.location.province,
            },
          },
        },
      });
    } catch (error: any) {
      toast({ title: "Something went wrong", description: error.message });
    }
  }

  if (!user || !user.id) return;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 space-y-12">
        <Stack>
          <h3 className="mb-4 text-xl underline underline-offset-8">
            Basic Information
          </h3>
          <div className="flex flex-wrap gap-8">
            <FirstNameFormField form={form} />
            <MiddlenameFormField form={form} />
            <LastNameFormField form={form} />
            <DobFormField form={form} />
            <EmailFormField form={form} />
            <HeightFormField form={form} />
            <CityFormField form={form} />
            <ProvinceFormField form={form} />
          </div>
        </Stack>

        <Stack>
          <h3 className="mb-4 text-xl underline underline-offset-8">
            Advanced Information
          </h3>
          <div className="flex flex-wrap gap-8">
            <ImagesFormField form={form} />
            <AgencyFormField form={form} />
            <BioFormField form={form} />
          </div>
        </Stack>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default TalentForm;

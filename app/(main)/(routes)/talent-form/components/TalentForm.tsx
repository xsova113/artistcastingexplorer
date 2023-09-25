"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { talentFormSchema } from "@/lib/talentFormSchema";
import DobFormField from "./DobFormField";
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
import Stack from "@/components/Stack";
import { createTalent } from "@/actions/createTalent";
import StageNameFormField from "./StageNameFormField";
import { useRouter } from "next/navigation";
import RoleFormField from "./RoleFormField";
import GenderFormField from "./GenderFormField";
import { TalentProfileType } from "@/types/talentProfileType";
import SkillFormField from "./SkillFormField";
import { updateTalent } from "@/actions/updateTalent";

interface TalentFormProps {
  talent?: TalentProfileType;
}

const TalentForm = ({ talent: initialData }: TalentFormProps) => {
  const { user } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof talentFormSchema>>({
    resolver: zodResolver(talentFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          images: initialData.images,
          skills: initialData.skills,
          gender: initialData.gender.gender,
          city: initialData.location.city || undefined,
          performerType: initialData.performerType.role,
          middleName: initialData.middleName || undefined,
          stageName: initialData.stageName || undefined,
          bodyType: initialData.bodyType || undefined,
          agency: initialData.agency || undefined,
        }
      : {
          firstName: "",
          lastName: "",
          agency: "",
          dob: new Date(),
          bio: "",
          bodyType: "",
          email: "",
          height: "",
          skills: [],
          images: [],
          middleName: "",
          stageName: "",
        },
  });

  const isSubmitting = form.formState.isSubmitting;

  const toastMessage = initialData
    ? "Profile updated."
    : "Profile created.";
  const action = initialData ? "Save changes" : "Create";

  async function onSubmit(values: z.infer<typeof talentFormSchema>) {
    try {
      if (initialData) {
        await updateTalent(values, user?.id);
      } else {
        const newTalent = await createTalent(values, user?.id);

        if (!newTalent) return;
      }

      toast({
        title: "Success",
        description: toastMessage,
        variant: "success",
      });
      
      router.push(`/profile/${initialData?.id}`);
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Error Submitting",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  if (!user || !user.id) return;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 space-y-12">
        <Stack>
          <h3 className="mb-8 text-xl underline underline-offset-8">
            Basic Information
          </h3>
          <div className="flex flex-wrap gap-8">
            <AgencyFormField form={form} />
            <FirstNameFormField form={form} />
            <MiddlenameFormField form={form} />
            <LastNameFormField form={form} />
            <GenderFormField form={form} />
            <DobFormField form={form} />
            <RoleFormField form={form} />
            <StageNameFormField form={form} />
            <EmailFormField form={form} />
            <HeightFormField form={form} />
            <CityFormField form={form} />
            <ProvinceFormField form={form} />
          </div>
        </Stack>

        <Stack>
          <h3 className="mb-8 text-xl underline underline-offset-8">
            Advanced Information
          </h3>
          <Stack className="gap-8">
            <Stack className="gap-8">
              <ImagesFormField form={form} />
              <BioFormField form={form} />
            </Stack>
            <SkillFormField form={form} />
          </Stack>
        </Stack>

        <Button disabled={isSubmitting} type="submit">
          {action}
        </Button>
      </form>
    </Form>
  );
};

export default TalentForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAuth, useUser } from "@clerk/nextjs";
import { talentFormSchema } from "@/lib/talentFormSchema";
import Stack from "@/components/Stack";
import { createTalent } from "@/actions/createTalent";
import { TalentProfileType } from "@/types/talentProfileType";
import { updateTalent } from "@/actions/updateTalent";
import {
  MiddlenameFormField,
  AgencyFormField,
  BioFormField,
  CityFormField,
  EmailFormField,
  FirstNameFormField,
  GenderFormField,
  HeightFormField,
  ImagesFormField,
  LastNameFormField,
  ProvinceFormField,
  RoleFormField,
  SkillFormField,
  StageNameFormField,
  AgeRangeFormField,
} from ".";
import LanguageFormField from "./LanguageFormField";
import { useCallback, useEffect, useState } from "react";
import { User } from "@clerk/nextjs/server";
import { getTalentUser } from "@/actions/getTalentUser";
import TalentUserIdFormField from "./TalentUserIdFormField";
import { usePathname } from "next/navigation";
import JapLanguageFormField from "./JapLanguageFormField";
import TermsAndConditions from "./TermsAndConditions";
import AgeCheckFormField from "./AgeCheckFormField";

interface TalentFormProps {
  talent?: TalentProfileType;
}

const TalentForm = ({ talent: initialData }: TalentFormProps) => {
  const { orgRole } = useAuth();
  const { user } = useUser();
  const [talentUser, setTalentUser] = useState<User>();
  const pathname = usePathname();

  const fetchTalentUser = useCallback(async () => {
    if (!initialData) return;
    const response = await getTalentUser(initialData.userId);
    setTalentUser(response);
  }, [initialData]);

  useEffect(() => {
    fetchTalentUser();
  }, [fetchTalentUser]);

  const form = useForm<z.infer<typeof talentFormSchema>>({
    resolver: zodResolver(talentFormSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          images: initialData.images,
          skills: initialData.skills,
          gender: initialData.gender.gender,
          city: initialData.location.city || undefined,
          province: initialData.location.province || undefined,
          language: initialData.language || undefined,
          JapaneseLanguage: initialData.japaneseLevel || undefined,
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
          bio: "",
          bodyType: "",
          email: "",
          height: "",
          skills: [],
          images: [],
          middleName: "",
          stageName: "",
          termAcceptance: false,
        },
  });

  const cityValue = form.watch("city");
  const termsValue = form.watch("termAcceptance");
  const ageCheck = form.watch("ageCheck");

  const isSubmitting = form.formState.isSubmitting;

  const toastMessage = initialData ? "Profile updated." : "Profile created.";
  const action = initialData ? "Save changes" : "Create";

  async function onSubmit(values: z.infer<typeof talentFormSchema>) {
    try {
      if (initialData) {
        if (orgRole === "admin") {
          await updateTalent(values, talentUser?.id);
          window.location.reload();
        } else {
          await updateTalent(values, user?.id);
          window.location.replace(`/profile/${initialData?.id}`);
        }
      } else {
        const newTalent = await createTalent(values, user?.id);

        if (!newTalent)
          return console.log("Failed to create a new talent profile.");

        window.location.replace(`/profile/${newTalent.id}`);
      }

      toast({
        title: "Success",
        description: toastMessage,
        variant: "success",
      });
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
          <div className="flex flex-wrap gap-6">
            {pathname === "/profileReview/createProfile" && (
              <TalentUserIdFormField form={form} />
            )}
            <AgencyFormField form={form} />
            <FirstNameFormField form={form} />
            <MiddlenameFormField form={form} />
            <LastNameFormField form={form} />
            <GenderFormField form={form} />
            <RoleFormField form={form} />
            <StageNameFormField form={form} />
            <EmailFormField form={form} />
            <HeightFormField form={form} />
            <CityFormField form={form} />
            {cityValue === "OTHER_PROVINCE" && (
              <ProvinceFormField form={form} />
            )}
            <LanguageFormField form={form} />
            <JapLanguageFormField form={form} />
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
            <div className="flex flex-wrap gap-4">
              <AgeRangeFormField form={form} />
            </div>

            <SkillFormField form={form} />
          </Stack>
        </Stack>

        <Stack className="gap-y-4">
          {!initialData && <TermsAndConditions form={form} />}
          {!initialData && <AgeCheckFormField form={form} />}
        </Stack>

        <Button
          disabled={
            isSubmitting || (initialData ? false : !termsValue || !ageCheck)
          }
          type="submit"
        >
          {action}
        </Button>
      </form>
    </Form>
  );
};

export default TalentForm;

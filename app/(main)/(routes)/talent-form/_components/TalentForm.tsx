"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
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
import UnionFormField from "./UnionFormField";
import SocialFormField from "./SocialFormField";
import HairFormField from "./HairFormField";
import EyeFormField from "./EyeFormField";
import { removeFile } from "@/actions/RemoveFile";
import VideoFormField from "./VideoFormField";
import { cn } from "@/lib/utils";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BodyTypeFormField from "./BodyTypeFormField";
import { toast } from "sonner";

interface TalentFormProps {
  talent?: TalentProfileType;
}

const TalentForm = ({ talent: initialData }: TalentFormProps) => {
  const { orgRole } = useAuth();
  const { user } = useUser();
  const [talentUser, setTalentUser] = useState<User>();
  const pathname = usePathname();
  const [filesToDelete, setFilesToDelete] = useState<string[]>([]);
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
          ageMax: initialData.ageMax || undefined,
          ageMin: initialData.ageMin || undefined,
          bio: initialData.bio || undefined,
          images: initialData.images,
          videos: initialData.videos,
          skills: initialData.skills,
          gender: initialData.gender || undefined,
          city: initialData.location.city,
          province: initialData.location.province || undefined,
          language: initialData.language,
          JapaneseLanguage: initialData.japaneseLevel,
          performerType: initialData.performerType.role,
          middleName: initialData.middleName || undefined,
          stageName: initialData.stageName || undefined,
          bodyType: initialData.bodyType || undefined,
          eye: initialData.eyeColour || undefined,
          hair: initialData.hairColour || undefined,
          agency: initialData.agency || undefined,
          union: initialData.union || undefined,
          instagram: initialData.instagram || undefined,
          twitter: initialData.twitter || undefined,
          youtube: initialData.youtube || undefined,
          tiktok: initialData.tiktok || undefined,
          website: initialData.website || undefined,
        }
      : {
          firstName: "",
          lastName: "",
          agency: "",
          bio: "",
          email: "",
          height: "",
          skills: [],
          images: [],
          videos: [],
          middleName: "",
          stageName: "",
          termAcceptance: false,
          ageCheck: false,
        },
  });

  const cityValue = form.watch("city");
  const termsValue = form.watch("termAcceptance");
  const ageCheck = form.watch("ageCheck");
  const images = form.watch("images");
  const videos = form.watch("videos");
  const addedVideos = videos?.filter(
    (v) => !initialData?.videos?.map((v) => v.fileKey).includes(v.fileKey),
  );
  const addedImages = images.filter(
    (image) =>
      !initialData?.images
        .map((image) => image.fileKey)
        .includes(image.fileKey),
  );

  const isSubmitting = form.formState.isSubmitting;
  const isFormEdited = form.formState.isDirty;

  const toastMessage = initialData ? "Profile updated." : "Profile created.";

  async function onSubmit(values: z.infer<typeof talentFormSchema>) {
    try {
      toast.loading("Submitting...");
      if (initialData) {
        if (orgRole === "admin") {
          await updateTalent(values, talentUser?.id);
          await removeFile(filesToDelete);
          window.location.reload();
        } else {
          await updateTalent(values, user?.id);
          await removeFile(filesToDelete);
          window.location.replace(`/profile/${initialData?.id}`);
        }
      } else {
        const newTalent = await createTalent(values, user?.id);
        await removeFile(filesToDelete);
        if (!newTalent)
          return console.log("Failed to create a new talent profile.");
        window.location.replace(`/profile/${newTalent.id}`);
      }

      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Failed to submit profile form");
      console.log("Error submitting talent form: " + error.message);
    }
  }

  useEffect(() => {
    const keyDownHandler = async (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();

        if (addedVideos) {
          await removeFile(addedVideos.map((v) => v.fileKey));
        }
        if (addedImages) {
          await removeFile(addedImages.map((image) => image.fileKey));
        }
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [addedImages, addedVideos]);

  if (!user || !user.id) return;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-12 space-y-8 overflow-y-scroll p-2"
      >
        {initialData && (
          <AlertDialogCancel
            className="absolute right-0 top-0 border-0 p-2"
            onClick={async () => {
              if (addedVideos) {
                await removeFile(addedVideos.map((v) => v.fileKey));
              }

              if (addedImages) {
                await removeFile(addedImages.map((image) => image.fileKey));
              }
            }}
          >
            <X size={20} />
          </AlertDialogCancel>
        )}

        <Stack>
          <span className={cn("mb-4 text-red-500", !isFormEdited && "hidden")}>
            * You have unsaved changes
          </span>
          <div className="mb-3 flex flex-col">
            <h3 className={cn("text-xl underline underline-offset-8")}>
              Basic Information
            </h3>
            <p className="mt-4 text-sm">
              <span className="text-lg text-red-500">*</span> fields are
              required
            </p>
          </div>
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
            <BodyTypeFormField form={form} />
            <HairFormField form={form} />
            <EyeFormField form={form} />
            <CityFormField form={form} />
            {cityValue === "OTHER_PROVINCE" && (
              <ProvinceFormField form={form} />
            )}
            <LanguageFormField form={form} />
            <JapLanguageFormField form={form} />
          </div>
        </Stack>

        <Stack>
          <div className="mb-3 flex flex-col">
            <h3 className="text-xl underline underline-offset-8">
              Advanced Information
            </h3>
            <p className="mt-4 text-sm">
              <span className="text-lg text-red-500">*</span> fields are
              required
            </p>
          </div>

          <Stack className="gap-8">
            <Stack className="gap-8">
              <ImagesFormField
                form={form}
                setFilesToDelete={setFilesToDelete}
                filesToDelete={filesToDelete}
              />
              <VideoFormField
                form={form}
                setFilesToDelete={setFilesToDelete}
                filesToDelete={filesToDelete}
              />
              <BioFormField form={form} />
            </Stack>
            <div className="flex flex-wrap gap-4">
              <AgeRangeFormField form={form} />
              <UnionFormField form={form} />
            </div>

            <SkillFormField form={form} />
            <SocialFormField form={form} />
          </Stack>
        </Stack>

        <Stack className="gap-y-4">
          {!initialData && <TermsAndConditions form={form} />}
          {!initialData && <AgeCheckFormField form={form} />}
        </Stack>

        {initialData ? (
          <AlertDialogFooter className="flex items-baseline gap-y-2">
            <span
              className={cn("mr-4 text-red-500", !isFormEdited && "hidden")}
            >
              * You have unsaved changes
            </span>
            <AlertDialogAction
              disabled={
                isSubmitting ||
                (initialData ? false : !termsValue || !ageCheck) ||
                !isFormEdited
              }
              type="submit"
            >
              Save changes
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={async () => {
                if (addedVideos) {
                  await removeFile(addedVideos.map((v) => v.fileKey));
                }

                if (addedImages) {
                  await removeFile(addedImages.map((image) => image.fileKey));
                }
              }}
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        ) : (
          <Button
            disabled={
              isSubmitting ||
              (initialData ? false : !termsValue || !ageCheck) ||
              !isFormEdited
            }
            type="submit"
          >
            Create
          </Button>
        )}
      </form>
    </Form>
  );
};

export default TalentForm;

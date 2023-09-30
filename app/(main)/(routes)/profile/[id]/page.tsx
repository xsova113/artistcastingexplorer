import { getTalentProfile } from "@/actions/getTalentProfile";
import ProfileHeader from "../components/ProfileHeader";
import { auth, clerkClient } from "@clerk/nextjs";
import Stack from "@/components/Stack";
import { Separator } from "@/components/ui/separator";
import TalentMedias from "../components/TalentMedias";
import TalentBio from "../components/TalentBio";
import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/client";

interface ProfilePageProps {
  params: { id: string };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { userId } = auth();
  const talent = await getTalentProfile(params.id);

  if (!talent) notFound();

  const talentUser = await clerkClient.users.getUser(talent.userId);

  if (talent.isApproved === false && userId !== talentUser.id) {
    redirect("/");
  }

  return (
    <section className="mx-auto my-20 flex w-full max-w-screen-xl">
      <Stack className="px-6 md:px-20">
        <ProfileHeader talentUser={talentUser} talent={talent} />
        <Separator className="mt-8" />
        <div className="mt-10 flex flex-col-reverse gap-x-14 gap-y-10 md:flex-row lg:mt-20">
          <TalentMedias medias={talent.images.map((image) => image.url)} />
          <TalentBio talent={talent} />
        </div>
      </Stack>
    </section>
  );
};

export default ProfilePage;

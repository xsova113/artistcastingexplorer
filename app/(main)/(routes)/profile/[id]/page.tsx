import { getTalentProfile } from "@/actions/getTalentProfile";
import ProfileHeader from "../components/ProfileHeader";
import { clerkClient } from "@clerk/nextjs";
import Stack from "@/components/Stack";
import { Separator } from "@/components/ui/separator";
import TalentMedias from "../components/TalentMedias";
import TalentBio from "../components/TalentBio";

interface ProfilePageProps {
  params: { id: string };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const talent = await getTalentProfile(params.id);

  if (!talent)
    return (
      <div className="my-20 text-center">
        <h1 className="text-lg">Talent not found...</h1>
      </div>
    );

  const talentUser = await clerkClient.users.getUser(talent.userId);

  return (
    <section className="mx-auto my-20 max-w-screen-xl">
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

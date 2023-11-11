import { getTalentProfile } from "@/actions/getTalentProfile";
import ProfileHeader from "../_components/ProfileHeader";
import { auth, clerkClient } from "@clerk/nextjs";
import Stack from "@/components/Stack";
import { Separator } from "@/components/ui/separator";
import TalentMedia from "../_components/TalentMedia";
import TalentBio from "../_components/TalentBio";
import { notFound, redirect } from "next/navigation";
import CreditSection from "../_components/CreditSection";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];
  const talent = await getTalentProfile(params.id);

  if (!talent)
    return {
      title: "Talent profile",
    };

  return {
    title: talent?.firstName + " " + talent?.lastName,
    openGraph: {
      images: [talent.images[0].url, ...previousImages],
    },
  };
}

interface ProfilePageProps {
  params: { id: string };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { userId, orgRole } = auth();
  const talent = await getTalentProfile(params.id);

  if (!talent) notFound();

  const talentUser = await clerkClient.users.getUser(talent.userId);
  const images = talent.images.map((image) => image.url);
  // const videos = talent.videos.map((video) => video.url);

  if (
    talent.isApproved === false &&
    userId !== talentUser.id &&
    orgRole !== "admin"
  ) {
    redirect("/");
  }

  return (
    <section className="mx-auto my-32 w-full max-w-screen-xl">
      <Stack className="px-6 md:px-20">
        <ProfileHeader talentUser={talentUser} talent={talent} />
        <Separator className="mt-8" />
        <div className="mt-10 flex flex-col-reverse gap-x-4 gap-y-4 md:flex-row lg:mt-20">
          <TalentMedia images={images} talent={talent} />
          <div className="w-full md:max-w-[60%]">
            <TalentBio talent={talent} />
            <CreditSection talent={talent} />
          </div>
        </div>
      </Stack>
    </section>
  );
};

export default ProfilePage;

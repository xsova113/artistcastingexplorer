import Stack from "@/components/Stack";
import { currentUser } from "@clerk/nextjs";
import TalentForm from "./components/TalentForm";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/client";

const TalentFormPage = async () => {
  const user = await currentUser();

  if (!user?.id) redirect("/sign-in");

  const talent = await prisma.talentProfile.findUnique({
    where: { userId: user.id },
    include: {
      images: true,
      location: true,
      gender: true,
      performerType: true,
      skills: true,
      credits: true
    },
  });

  return (
    <section className="mx-auto max-w-screen-xl">
      <Stack className="px-6 py-20 md:px-20">
        <h1 className="text-4xl font-semibold">Talent Form</h1>
        <Separator className="mt-2" />
        <TalentForm talent={talent || undefined} />
      </Stack>
    </section>
  );
};

export default TalentFormPage;

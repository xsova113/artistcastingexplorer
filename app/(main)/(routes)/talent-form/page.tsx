import Stack from "@/components/Stack";
import checkTalent from "@/lib/checkTalent";
import { auth, currentUser } from "@clerk/nextjs";
import TalentForm from "./components/TalentForm";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const TalentFormPage = async () => {
  const { userId } = auth();
  const isTalent = await checkTalent();

  if (!userId) redirect("/sign-in");

  return (
    <section className="mx-auto max-w-screen-xl">
      <Stack className="px-6 py-20 md:px-20">
        <h1 className="text-4xl font-semibold">Talent Form</h1>
        <Separator className="mt-2" />
        <TalentForm />
      </Stack>
    </section>
  );
};

export default TalentFormPage;

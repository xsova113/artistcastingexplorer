import { getTalents } from "@/actions/getTalents";
import Stack from "@/components/Stack";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import FilterReview from "./components/FilterReview";
import { fetchFilteredTalents } from "@/lib/utils";
import TalentReviewSection from "./components/TalentReviewSection";
import SortForm from "../directory/components/SortForm";

interface ProfileReviewPageProps {
  searchParams: { name: string; status: string; email: string };
}

const admin = process.env.ADMIN_EMAIL;
const admin2 = process.env.ADMIN_EMAIL2;
const admin3 = process.env.ADMIN_EMAIL3;

const ProfileReviewPage = async ({ searchParams }: ProfileReviewPageProps) => {
  const user = await currentUser();
  const talents = await getTalents();

  if (!user) redirect("/");

  if (
    user.emailAddresses[0].emailAddress !== admin &&
    user.emailAddresses[0].emailAddress !== admin2 &&
    user.emailAddresses[0].emailAddress !== admin3
  )
    redirect("/");

  if (!talents || talents.length === 0)
    return <div className="py-20 text-center">No talents found...</div>;

  const filteredTalents = fetchFilteredTalents(talents, searchParams);

  return (
    <section className="mx-auto max-w-screen-lg py-20">
      <Stack className="mx-4 md:mx-10">
        <h1 className="text-4xl font-semibold">Profile Review</h1>
        <FilterReview />
        <TalentReviewSection filteredTalents={filteredTalents} />
      </Stack>
    </section>
  );
};

export default ProfileReviewPage;

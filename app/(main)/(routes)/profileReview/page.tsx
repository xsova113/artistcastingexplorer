import { getTalents } from "@/actions/getTalents";
import Stack from "@/components/Stack";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import TalentReviewCard from "./components/TalentReviewCard";
import FilterReview from "./components/FilterReview";
import { fetchFilteredTalents } from "@/lib/utils";

interface ProfileReviewPageProps {
  searchParams: { lastName: string; status: string; email: string };
}

const admin = process.env.ADMIN_EMAIL;
const admin2 = process.env.ADMIN_EMAIL2;

const ProfileReviewPage = async ({ searchParams }: ProfileReviewPageProps) => {
  const user = await currentUser();
  const talents = await getTalents();

  if (!user) redirect("/");

  if (user.emailAddresses[0].emailAddress !== (admin && admin2)) redirect("/");

  if (!talents || talents.length === 0)
    return <div className="py-20 text-center">No talents found...</div>;

  const filteredTalents = fetchFilteredTalents(talents, searchParams);

  return (
    <section className="mx-auto max-w-screen-lg py-20">
      <Stack className="mx-10">
        <h1 className="text-4xl font-semibold">Profile Review</h1>
        <FilterReview />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredTalents?.map((talent) => (
            <TalentReviewCard key={talent.id} talent={talent} />
          ))}
        </div>
      </Stack>
    </section>
  );
};

export default ProfileReviewPage;

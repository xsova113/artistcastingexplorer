import { getTalents } from "@/actions/getTalents";
import Stack from "@/components/Stack";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import FilterReview from "./components/FilterReview";
import { fetchFilteredTalents } from "@/lib/utils";
import TalentReviewSection from "./components/TalentReviewSection";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

interface ProfileReviewPageProps {
  searchParams: { name: string; status: string; email: string };
}

const ProfileReviewPage = async ({ searchParams }: ProfileReviewPageProps) => {
  const { orgRole, user } = auth();
  const talents = await getTalents();

  if (!user && orgRole !== "admin") redirect("/");

  if (!talents || talents.length === 0)
    return <div className="py-20 text-center">No talents found...</div>;

  const filteredTalents = fetchFilteredTalents(talents, searchParams);

  return (
    <section className="mx-auto max-w-screen-lg py-20">
      <Stack className="mx-4 md:mx-10">
        <h1 className="text-4xl font-semibold">Profile Review</h1>
        <FilterReview />
        <Link
          href={"/profileReview/createProfile"}
          className={buttonVariants({ className: "-mb-10 w-fit" })}
        >
          Create Profile
        </Link>
        <TalentReviewSection filteredTalents={filteredTalents} />
      </Stack>
    </section>
  );
};

export default ProfileReviewPage;

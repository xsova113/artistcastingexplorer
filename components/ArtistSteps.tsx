import checkTalent from "@/lib/checkTalent";
import { SignUpButton, auth } from "@clerk/nextjs";
import Link from "next/link";

const ArtistSteps = async () => {
  const isTalent = await checkTalent();
  const { userId } = auth();

  return (
    <div className="flex flex-col gap-y-4 rounded-lg bg-secondary p-4">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-lg font-semibold">For Artist or Creator</h1>
        <p className="text-sm text-muted-foreground">
          Easy 3 Steps to register and post your artist profile!
        </p>
      </div>
      <ul className="space-y-4 text-sm">
        <li className="rounded border-l-2 border-primary bg-white p-2">
          1.{" "}
          {userId ? (
            <span className="cursor-pointer underline">Sign-up</span>
          ) : (
            <SignUpButton mode="modal">
              <span className="cursor-pointer underline">Sign-up</span>
            </SignUpButton>
          )}
          here for free!
        </li>
        <li className="rounded border-l-2 border-primary bg-white p-2">
          2.{" "}
          <Link
            className="underline"
            href={isTalent ? `/profile/${isTalent.id}` : "/talent-form"}
          >
            Click here
          </Link>{" "}
          and fill out your profile!
        </li>
        <li className="rounded border-l-2 border-primary bg-white p-2">
          3. Create your profile form!
        </li>
      </ul>
    </div>
  );
};

export default ArtistSteps;

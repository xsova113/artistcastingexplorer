import { SignUpButton, auth } from "@clerk/nextjs";

const AgentSteps = async () => {
  const { userId } = auth();

  return (
    <div className="flex flex-col gap-y-4 rounded-lg bg-secondary p-4">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-lg font-semibold">For Casting Agent</h1>
        <p className="text-sm text-muted-foreground">
          Easy 3 Steps to register and initiate contact with artists and
          creators!
        </p>
      </div>
      <ul className="space-y-4 text-sm">
        <li className="rounded border-l-2 border-primary bg-white p-2">
          1.{" "}
          {userId ? (
            <span className="cursor-pointer underline">Sign-up{" "}</span>
          ) : (
            <SignUpButton mode="modal">
              <span className="cursor-pointer underline">Sign-up{" "}</span>
            </SignUpButton>
          )}
          here for free!
        </li>
        <li className="rounded border-l-2 border-primary bg-white p-2">
          2. Let&apos;s promptly initiate contact with the talents!
        </li>
        <li className="rounded border-l-2 border-primary bg-white p-2">
          3. Sign-up for our newsletter to stay informed about the latest news
          and newly joined ACE members!{" "}
          <a href="#newsletter" className="underline">
            Click here!
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AgentSteps;

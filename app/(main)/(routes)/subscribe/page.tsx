import EasySteps from "@/components/EasySteps";
import FreePlanCard from "./_components/FreePlanCard";
import PremiumCard from "./_components/PremiumCard";
import { checkSubscription } from "@/lib/subscription";

const SubscribePage = async () => {
  const isPremium = await checkSubscription();

  return (
    <section>
      <div className="mx-auto flex max-w-screen-lg flex-col items-center pb-20 pt-20 max-md:px-12 md:px-20">
        <h1 className="mx-auto mb-2 text-center text-4xl font-bold md:text-5xl">
          Subscription Plans
        </h1>
        <p className="mb-10 text-center text-muted-foreground">
          Sign up for newsletter or join premium plan
        </p>
        <EasySteps />
        <div className="flex flex-col gap-4 gap-y-8 lg:flex-row">
          <FreePlanCard />
          <PremiumCard isPremium={isPremium} />
        </div>
      </div>
    </section>
  );
};

export default SubscribePage;

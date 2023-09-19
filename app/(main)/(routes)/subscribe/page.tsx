import HeroSection from "@/components/HeroSection";
import FreePlanCard from "./components/FreePlanCard";
import PremiumCard from "./components/PremiumCard";
import { checkSubscription } from "@/lib/subscription";

const SubscribePage = async () => {
  const isPremium = await checkSubscription();
  
  return (
    <section>
      <HeroSection
        image={"/subscribe.jpg"}
        title={"Subscription"}
        description="Subscribe to our newslatter for the latest news or join our premium plan for additional features"
      />

      <div className="max-w-screen-lg mx-auto flex flex-col md:px-20 pb-20 max-md:px-12 pt-20 items-center">
        <h1 className="mb-2 text-2xl semibold mx-auto">Subscription Plans</h1>
        <p className="mb-10 text-muted-foreground">
          Sign up for newsletter or join premium plan
        </p>
        <div className="flex flex-col gap-4 lg:flex-row gap-y-8">
          <FreePlanCard />
          <PremiumCard isPremium={isPremium} />
        </div>
      </div>
    </section>
  );
};

export default SubscribePage;

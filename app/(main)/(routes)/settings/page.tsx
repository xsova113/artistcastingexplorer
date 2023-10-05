import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const isPremium = await checkSubscription();

  return (
    <section className="max-w-screen-lg mx-auto py-20 md:px-8 px-4">
      <h1 className="font-bold md:text-4xl text-3xl">Manage Subscription</h1>
    </section>
  );
};

export default SettingsPage;

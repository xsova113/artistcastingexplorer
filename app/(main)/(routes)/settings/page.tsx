import { checkSubscription } from "@/lib/subscription";

const SettingsPage = async () => {
  const isPremium = await checkSubscription();

  return <div>is premium? {isPremium ? "true" : "false"}</div>;
};

export default SettingsPage;

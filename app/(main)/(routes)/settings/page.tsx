import { Separator } from "@/components/ui/separator";
import { checkSubscription } from "@/lib/subscription";
import ManageSubscription from "./components/ManageSubscription";
import Stack from "@/components/Stack";
import ManageSavedTalents from "./components/ManageSavedTalents";
import ManageSavedFilter from "./components/ManageSavedFilter";
import { fetchSavedFilter } from "@/actions/fetchSavedFilter";
import checkTalent from "@/lib/checkTalent";

const SettingsPage = async () => {
  const isPremium = await checkSubscription();
  const savedFilter = await fetchSavedFilter();
  const talent = await checkTalent();

  return (
    <section className="mx-auto max-w-screen-lg px-4 py-20 md:px-8">
      <Stack className="mb-4 gap-2">
        <h1 className="text-3xl font-bold md:text-4xl">Settings</h1>
        <p className="text-muted-foreground">
          Manage subscriptions and preferences
        </p>
      </Stack>

      <Separator className="mb-16" />

      <Stack>
        <ManageSubscription isPremium={isPremium} />
        <Separator className="my-8" />
        <ManageSavedFilter
          savedFilter={savedFilter}
          isPremium={isPremium}
          talent={talent}
        />
        <Separator className="my-8" />
        <ManageSavedTalents />
      </Stack>
    </section>
  );
};

export default SettingsPage;

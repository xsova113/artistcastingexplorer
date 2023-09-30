import { findUserSavedTalent } from "@/actions/findUserSavedTalent";
import { Separator } from "@/components/ui/separator";
import { checkSubscription } from "@/lib/subscription";
import ManageSubscription from "./components/ManageSubscription";
import Stack from "@/components/Stack";
import ManageSavedTalents from "./components/ManageSavedTalents";
import ManageSavedFilter from "./components/ManageSavedFilter";
import { fetchSavedFilter } from "@/actions/fetchSavedFilter";

const SettingsPage = async () => {
  const isPremium = await checkSubscription();
  const savedTalents = await findUserSavedTalent();
  const savedFilter = await fetchSavedFilter();

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
        <ManageSavedFilter savedFilter={savedFilter} />
        <Separator className="my-8" />
        <ManageSavedTalents savedTalents={savedTalents} />
      </Stack>
    </section>
  );
};

export default SettingsPage;

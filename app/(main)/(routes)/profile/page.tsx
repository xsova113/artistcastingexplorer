import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UpdateProfileForm from "./components/UpdateProfileForm";

const ProfilePage = async () => {
  const user = await currentUser();

  if (!user?.id) redirect("/sign-up");

  return (
    <section className="mx-auto max-w-screen-lg px-4 py-20 md:px-8">
      <h1 className="text-3xl font-bold md:text-4xl">Profile</h1>
      <UpdateProfileForm userId={user.id} />
      <span>
        {user.firstName} {user.lastName} {user.emailAddresses[0].emailAddress}
      </span>
    </section>
  );
};

export default ProfilePage;

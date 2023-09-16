import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const user = await currentUser();

  if (!user?.id) redirect("/sign-up");

  return (
    <section className="max-w-screen-lg mx-auto py-20">
      <h1 className="font-bold md:text-4xl text-3xl">Profile</h1>
    </section>
  );
};

export default ProfilePage;

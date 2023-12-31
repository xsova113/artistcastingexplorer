import { CreateOrganization, auth } from "@clerk/nextjs";
import { notFound } from "next/navigation";

const CreateOrganizationPage = async () => {
  const { userId, orgRole } = auth();

  if (
    userId !== process.env.ADMIN_ID1 &&
    userId !== process.env.ADMIN_ID2 &&
    orgRole !== "admin"
  )
    notFound();

  return <CreateOrganization />;
};
export default CreateOrganizationPage;

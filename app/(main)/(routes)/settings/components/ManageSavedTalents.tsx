import Stack from "@/components/Stack";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs";

const ManageSavedTalents = async () => {
  const { userId } = auth();

  const savedTalents = !userId
    ? []
    : await prisma.talentProfile.findMany({
        where: { likes: { has: userId } },
        include: {
          images: true,
          performerType: true,
          location: true,
        },
      });

  const formattedData = savedTalents.map((talent) => ({
    id: talent.id,
    name: talent.firstName + " " + talent.lastName,
    image: talent.images.map((img) => img.url)[0],
    role: talent.performerType.role,
    location: talent.location.city || talent.location.province,
  }));

  return (
    <Stack>
      <h1 className="text-xl font-medium">Saved Talents</h1>
      <DataTable columns={columns} data={formattedData || []} />
    </Stack>
  );
};

export default ManageSavedTalents;

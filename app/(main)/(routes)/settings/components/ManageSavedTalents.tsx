"use client";

import Stack from "@/components/Stack";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import prisma from "@/lib/client";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "react-query";

const ManageSavedTalents = () => {
  const { userId } = useAuth();

  const { data: savedTalents } = useQuery({
    queryFn: async () =>
      await prisma.talentProfile.findMany({
        where: { likes: { has: userId } },
        include: {
          images: true,
          performerType: true,
          location: true,
        },
      }),
  });

  const formattedData =
    !userId || !savedTalents
      ? []
      : savedTalents.map((talent) => ({
          id: talent.id,
          name: talent.firstName + " " + talent.lastName,
          image: talent.images.map((img) => img.url)[0],
          role: talent.performerType.role,
          location: talent.location.city || talent.location.province,
        }));

  return (
    <Stack>
      <h1 className="text-xl font-medium">Saved Talents</h1>
      <DataTable columns={columns} data={formattedData} />
    </Stack>
  );
};

export default ManageSavedTalents;

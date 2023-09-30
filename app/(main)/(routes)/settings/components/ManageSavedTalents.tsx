import Stack from "@/components/Stack";
import { UserSavedTalentType } from "../../directory/components/TalentCard";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import prisma from "@/lib/client";

interface ManageSavedTalentsProps {
  savedTalents?: UserSavedTalentType | void | null;
}

const ManageSavedTalents = async ({
  savedTalents,
}: ManageSavedTalentsProps) => {
  const savedTalentProfiles = await prisma.talentProfile.findMany({
    where: {
      id: {
        in: savedTalents?.savedTalents.map(
          (talent) => talent.talentProfileId as string,
        ),
      },
    },
    include: {
      images: true,
      location: true,
      performerType: true,
    },
  });

  const formattedData = savedTalentProfiles.map((talent) => ({
    id: talent.id,
    name: talent.firstName + " " + talent.lastName,
    image: talent.images
      .map((img) => img.url)
      .filter(
        (image) => image.split(".").pop() === ("jpg" || "png" || "jpeg"),
      )[0],
    role: talent.performerType.role,
    location: talent.location.city || talent.location.province,
  }));

  return (
    <Stack>
      <h1 className="text-xl font-medium">Saved Talents Preference</h1>
      <DataTable columns={columns} data={formattedData} />
    </Stack>
  );
};

export default ManageSavedTalents;

import Stack from "@/components/Stack";
import { Separator } from "@/components/ui/separator";
import { TalentProfile } from "@prisma/client";

interface TalentBio {
  talent: TalentProfile;
}

const TalentBio = ({ talent }: TalentBio) => {
  return (
    <Stack className="w-full md:w-[60%]">
      <h1 className="mb-4 text-2xl font-semibold">About me</h1>
      <p>{talent.bio}</p>
      <Separator className="my-5" />
      <h1 className="mb-4 text-2xl font-semibold">Skills</h1>
      <p>TODO: Add skills</p>
      <Separator className="my-5" />
      <h1 className="mb-4 text-2xl font-semibold">Credits</h1>
      <p>TODO: Add Credits</p>
      <Separator className="my-5" />
      <h1 className="mb-4 text-2xl font-semibold">Union Affiliation</h1>
      <p>TODO: Add Affiliations</p>
    </Stack>
  );
};

export default TalentBio;

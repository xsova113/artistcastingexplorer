import Stack from "@/components/Stack";
import { Separator } from "@/components/ui/separator";
import { TalentProfileType } from "@/types/talentProfileType";

interface TalentBio {
  talent: TalentProfileType;
}

const TalentBio = ({ talent }: TalentBio) => {
  return (
    <div className="rounded-lg border p-2 shadow">
      <h1 className="mb-6 text-2xl font-semibold">Biography</h1>
      <Stack className="gap-4">
        <h3 className="text-lg font-medium">About me</h3>
        <p className="text-muted-foreground">{talent.bio}</p>
      </Stack>

      <Separator className="my-5" />
      <h1 className="mb-4 text-lg font-medium">Skills</h1>
      <div className="flex flex-wrap gap-3 text-muted-foreground">
        {talent.skills.map((skill) => (
          <div
            key={skill.id}
            className="cursor-default rounded bg-secondary p-2 shadow transition hover:-translate-y-1 hover:scale-110"
          >
            <span className="capitalize">
              {skill.skill?.replaceAll("_", " ")}
            </span>
          </div>
        ))}
      </div>
      <Separator className="my-5" />
      <h1 className="mb-4 text-lg font-medium">Union Affiliation</h1>
      <p className="text-muted-foreground">TODO: Add Affiliations</p>
    </div>
  );
};

export default TalentBio;

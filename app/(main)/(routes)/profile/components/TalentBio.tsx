import Stack from "@/components/Stack";
import { Separator } from "@/components/ui/separator";
import { TalentProfileType } from "@/types/talentProfileType";

interface TalentBio {
  talent: TalentProfileType;
}

const TalentBio = ({ talent }: TalentBio) => {
  return (
    <Stack className="w-full md:w-[60%]">
      <h1 className="mb-4 text-2xl font-semibold">About me</h1>
      <p className="text-muted-foreground">{talent.bio}</p>
      <Separator className="my-5" />
      <h1 className="mb-4 text-2xl font-semibold">Skills</h1>
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
      <h1 className="mb-4 text-2xl font-semibold">Credits</h1>
      <p className="text-muted-foreground">TODO: Add Credits</p>
      <Separator className="my-5" />
      <h1 className="mb-4 text-2xl font-semibold">Union Affiliation</h1>
      <p className="text-muted-foreground">TODO: Add Affiliations</p>
    </Stack>
  );
};

export default TalentBio;

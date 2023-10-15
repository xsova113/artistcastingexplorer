import Stack from "@/components/Stack";
import { Separator } from "@/components/ui/separator";
import { cmToInFt } from "@/lib/utils";
import { TalentProfileType } from "@/types/talentProfileType";

interface TalentBio {
  talent: TalentProfileType;
}

const TalentBio = ({ talent }: TalentBio) => {
  const height = cmToInFt(Number(talent.height));

  return (
    <div className="rounded-lg border p-3 shadow">
      <h1 className="mb-6 text-2xl font-semibold">Biography</h1>
      <Stack>
        <h3 className="mb-4 text-lg font-medium">Attributes</h3>
        <div className="flex flex-col space-y-1 text-sm">
          <li className="capitalize">
            <span className="">Body Type:</span>{" "}
            <span className="text-muted-foreground">
              {talent.bodyType?.toLowerCase().replaceAll("_", " ")}
            </span>
          </li>
          <li className="capitalize">
            <span className="">Hair colour:</span>{" "}
            <span className="text-muted-foreground">
              {talent.hairColour?.toLowerCase().replaceAll("_", " ")}
            </span>
          </li>
          <li className="capitalize">
            <span className="">Eye colour:</span>{" "}
            <span className="text-muted-foreground">
              {talent.eyeColour?.toLowerCase().replaceAll("_", " ")}
            </span>
          </li>
          <li className="capitalize">
            <span className="">Height:</span>{" "}
            <span className="text-muted-foreground">
              {height.feet}&apos;{height.inches}
            </span>
          </li>
        </div>
      </Stack>
      <Separator className="my-5" />
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
      <p className="text-muted-foreground">{talent.union}</p>
    </div>
  );
};

export default TalentBio;

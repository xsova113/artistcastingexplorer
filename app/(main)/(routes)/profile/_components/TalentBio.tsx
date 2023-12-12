"use client";

import Stack from "@/components/Stack";
import { Separator } from "@/components/ui/separator";
import { cmToInFt } from "@/lib/utils";
import { TalentProfileType } from "@/types/talentProfileType";
import dynamic from "next/dynamic";
import { Raleway } from "next/font/google";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

interface TalentBio {
  talent: TalentProfileType;
}

const font = Raleway({
  subsets: ["latin"],
  weight: ["100", "400", "500", "600", "700", "900"],
});

const TalentBio = ({ talent }: TalentBio) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill")), []);
  const height = cmToInFt(Number(talent.height));

  return (
    <div className="rounded-lg border p-3 shadow">
      <h1 className="mb-6 text-2xl font-semibold">Biography</h1>
      <Stack>
        <h3 className="mb-4 text-lg font-medium">Attributes</h3>
        <div className="flex flex-col space-y-1 text-sm">
          {talent.ageMin && talent.ageMax ? (
            <>
              <li className="capitalize">
                <span className="">Age range:</span>{" "}
                <span className="text-muted-foreground">{`${talent.ageMin} - ${talent.ageMax}`}</span>
              </li>
            </>
          ) : null}

          {talent.gender && talent.gender === "PREFER_NOT_TO_SAY" ? (
            <li className="capitalize">
              <span className="">Gender:</span>{" "}
              <span className="text-muted-foreground">
                {talent.gender?.toLowerCase().replaceAll("_", " ")}
              </span>
            </li>
          ) : null}

          {talent.bodyType && (
            <li className="capitalize">
              <span className="">Body Type:</span>{" "}
              <span className="text-muted-foreground">
                {talent.bodyType?.toLowerCase().replaceAll("_", " ")}
              </span>
            </li>
          )}

          {talent.hairColour && (
            <li className="capitalize">
              <span className="">Hair colour:</span>{" "}
              <span className="text-muted-foreground">
                {talent.hairColour?.toLowerCase().replaceAll("_", " ")}
              </span>
            </li>
          )}

          {talent.eyeColour && (
            <li className="capitalize">
              <span className="">Eye colour:</span>{" "}
              <span className="text-muted-foreground">
                {talent.eyeColour?.toLowerCase().replaceAll("_", " ")}
              </span>
            </li>
          )}

          {talent.height && (
            <li className="capitalize">
              <span className="">Height:</span>{" "}
              <span className="text-muted-foreground">
                {height.feet + "'" + height.inches}
              </span>
            </li>
          )}
        </div>
      </Stack>

      <Separator className="my-5" />

      <Stack className="gap-4">
        <h3 className="text-lg font-medium">About me</h3>
        {!talent.bio?.includes("<p>") ? (
          <pre>{talent.bio}</pre>
        ) : (
          <ReactQuill
            theme="bubble"
            value={talent.bio || "No bio..."}
            readOnly
          />
        )}
      </Stack>

      <Separator className="my-5" />
      <h1 className="mb-4 text-lg font-medium">Skills</h1>
      <div className="flex flex-wrap gap-3 text-muted-foreground">
        {talent.skills?.map((skill) => (
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
      <h1 className="mb-4 text-lg font-medium">Agency</h1>
      {talent.agency &&
        talent.agency?.split(",").map((item) => (
          <p key={item} className="text-muted-foreground">
            - {item}
          </p>
        ))}

      <Separator className="my-5" />
      <h1 className="mb-4 text-lg font-medium">Union Affiliation</h1>
      <p className="text-muted-foreground">{talent.union}</p>
    </div>
  );
};

export default TalentBio;

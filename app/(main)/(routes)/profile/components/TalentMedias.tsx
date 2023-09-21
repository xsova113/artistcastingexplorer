import Stack from "@/components/Stack";
import Image from "next/image";

interface TalentMediasProps {
  medias: string[];
}

const TalentMedias = ({ medias }: TalentMediasProps) => {
  return (
    <Stack className="w-full md:w-[40%]">
      <h1 className="mb-4 text-2xl font-semibold">Medias</h1>
      <div className="relative h-[400px] w-full overflow-hidden rounded">
        <Image
          src={medias[0]}
          alt={"Main talent image"}
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-4">
        {medias.map((media) => (
          <div
            key={media}
            className="relative mt-4 h-20 w-20 overflow-hidden rounded-md"
          >
            {media.split(".").pop() === ("jpg" || "jpeg" || "png") ? (
              <Image fill src={media} alt={media} className="object-cover" />
            ) : (
              <video src={media} controls className="object-cover" />
            )}
          </div>
        ))}
      </div>
    </Stack>
  );
};

export default TalentMedias;

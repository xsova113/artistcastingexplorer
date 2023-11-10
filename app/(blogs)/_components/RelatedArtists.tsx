"use client";

import { client } from "@/sanity/lib/client";
import { BlogPost } from "@/types/post";
import { RelatedArtist } from "@/types/relatedArtist";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface RelatedArtistsProps {
  post: BlogPost;
}

const RelatedArtists = ({ post }: RelatedArtistsProps) => {
  const router = useRouter();
  const [relatedArtists, setRelatedArtists] = useState<RelatedArtist[]>();
  const relatedArtistIds = post.relatedArtists
    ?.map((artist) => `"${artist._ref}"`)
    .join(", ");

  const fetchRelatedArtists = useCallback(async () => {
    await client
      .fetch(`*[_type == 'relatedArtist' && _id in [${relatedArtistIds}]]`)
      .then((res) => setRelatedArtists(res));
  }, [relatedArtistIds]);

  useEffect(() => {
    fetchRelatedArtists();
    router.refresh();
  }, [fetchRelatedArtists, router]);

  return (
    <>
      {!relatedArtists ? null : (
        <div className="flex flex-col gap-y-4 pt-16 text-muted-foreground">
          <h1 className="text-lg font-medium text-black">Related Artists:</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {relatedArtists.map((item) => (
              <Link
                href={item.profileUrl}
                key={item._id}
                className="overflow-clip rounded-lg border"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="bg-primary-foreground object-contain"
                  />
                </div>
                <div className="flex flex-col gap-y-2 p-4 text-sm">
                  <h3 className="text-lg font-semibold capitalize text-black">
                    {item.name}
                  </h3>
                  <p>{item.role}</p>
                  <p>{item.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedArtists;

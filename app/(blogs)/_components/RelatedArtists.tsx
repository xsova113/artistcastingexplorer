"use client";

import FlexBetween from "@/components/FlexBetween";
import { client } from "@/sanity/lib/client";
import { BlogPost } from "@/types/post";
import { RelatedArtist } from "@/types/relatedArtist";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface RelatedArtistsProps {
  post: BlogPost;
}

const RelatedArtists = ({ post }: RelatedArtistsProps) => {
  const [relatedArtists, setRelatedArtists] = useState<RelatedArtist[]>();

  const fetchRelatedArtists = useCallback(async () => {
    await client
      .fetch(`*[_type == 'relatedArtist']`)
      .then((res) => setRelatedArtists(res));
  }, []);

  useEffect(() => {
    fetchRelatedArtists();
  }, [fetchRelatedArtists]);

  const filteredRelatedArtists = relatedArtists
    ?.map((item) => item)
    .filter(
      (artist) =>
        post.relatedArtists?.map((item) => item._ref).includes(artist._id),
    );

  return (
    <div className="flex flex-col gap-y-4 pt-16 text-muted-foreground">
      <h1 className="text-lg font-medium text-black">Related Artists:</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredRelatedArtists?.map((item) => (
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
              <h3 className="text-lg text-black font-semibold capitalize">{item.name}</h3>
              <p>{item.role}</p>
              <p>{item.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedArtists;

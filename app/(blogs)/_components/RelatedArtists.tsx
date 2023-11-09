"use client";

import { client } from "@/sanity/lib/client";
import { BlogPost } from "@/types/post";
import { RelatedArtist } from "@/types/relatedArtist";
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
    <div>
      {filteredRelatedArtists?.map((item) => <p key={item._id}>{item.name}</p>)}
    </div>
  );
};

export default RelatedArtists;

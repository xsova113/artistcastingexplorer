import React from "react";
import DirectoryCard from "./DirectoryCard";

const DIrectoryCards = () => {
  return (
    <div className="mx-8 mb-24 flex max-w-screen-xl flex-col gap-x-4 gap-y-4 self-center md:flex-row">
      <DirectoryCard
        image={
          "https://castingjapanese.ca/wp-content/uploads/2023/09/women-fashion-free-img.jpg"
        }
        title={"Top Actors"}
        description={
          "Consectetur ipsum ullamco esse reprehenderit cupidatat cillum laborum do occaecat aute cillum."
        }
      />
      <DirectoryCard
        image={
          "https://castingjapanese.ca/wp-content/uploads/2023/09/men-fashion-free-img.jpg"
        }
        title={"Hire Models"}
        description={
          "Consectetur non cupidatat reprehenderit velit ex labore labore aute."
        }
      />
      <DirectoryCard
        image={
          "https://castingjapanese.ca/wp-content/uploads/2023/09/carnival-lights-holiday-4092632.jpg"
        }
        title={"Dicover Entertainers"}
        description={
          "Fugiat veniam adipisicing laboris id qui velit labore et velit voluptate sit anim duis."
        }
      />
    </div>
  );
};

export default DIrectoryCards;

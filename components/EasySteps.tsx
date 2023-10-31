import React from "react";
import ArtistSteps from "./ArtistSteps";
import AgentSteps from "./AgentSteps";

const EasySteps = () => {
  return (
    <section className="mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-20">
      <AgentSteps />
      <ArtistSteps />
    </section>
  );
};

export default EasySteps;

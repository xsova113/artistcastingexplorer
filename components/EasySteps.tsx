import React from "react";
import ArtistSteps from "./ArtistSteps";
import AgentSteps from "./AgentSteps";

const EasySteps = () => {
  return (
    <section className="mb-10 flex flex-col sm:gap-20 gap-10 sm:flex-row">
      <AgentSteps />
      <ArtistSteps />
    </section>
  );
};

export default EasySteps;

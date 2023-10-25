import React from "react";

const Mission = () => {
  return (
    <div className="relative mx-auto mt-20 flex w-5/6 max-w-screen-xl flex-col items-center rounded-lg border bg-slate-800 p-16 px-2.5 text-center sm:px-10">
      <div className="absolute right-10 top-20 h-52 w-52 rounded-full bg-slate-700 blur-3xl" />
      <div className="absolute bottom-4 left-20 h-40 w-40 rounded-full bg-slate-700 blur-3xl" />
      <div className="z-10 flex flex-col items-center gap-6 text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">Our Mission</h1>
        <p className="w-full text-muted lg:w-4/5">
          Our objective is to facilitate connections between Canadian and
          Japanese entertainment professionals, with the aim of nurturing a
          mutually beneficial and enduring relationship. <br />
          At Artist Casting Explorer, we are dedicated to enhancing the success
          of Hollywood North by uniting talented individuals with creators who
          craft entertainment that honors and pushes the boundaries of their
          cultures
        </p>
      </div>
    </div>
  );
};

export default Mission;

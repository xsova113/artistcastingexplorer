"use client";

import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <PuffLoader />
    </div>
  );
};

export default Loading;

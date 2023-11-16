"use client";

import { ColorRing } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex h-full items-center justify-center animate-spin">
      <ColorRing />
    </div>
  );
};

export default Loading
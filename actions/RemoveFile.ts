"use server";

import { utApi } from "@/lib/server/uploadthing";

export const removeFile = async (fileKeys: string[]) => {
  try {
    if (fileKeys.length === 0) return console.log("No files to remove");

    await utApi.deleteFiles(fileKeys);
  } catch (error) {
    console.log(error);
  }
};

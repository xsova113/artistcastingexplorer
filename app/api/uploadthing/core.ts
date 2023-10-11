import { currentUser } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  return { userId: user.id };
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "1024MB", maxFileCount: 8 } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
  videoUploader: f({ video: { maxFileSize: "1GB", maxFileCount: 5 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

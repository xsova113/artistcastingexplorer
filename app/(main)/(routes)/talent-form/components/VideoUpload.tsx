"use client";

import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import useMediaQuery from "@/hooks/useMediaQuery";
import "@uploadthing/react/styles.css";

interface VideoUploadProps {
  disabled?: boolean;
  onChange: (values: { url?: string; fileKey?: string }[]) => void;
  onRemove: ({ url, fileKey }: { url: string; fileKey: string }) => void;
  values: { url: string; fileKey: string }[];
}

const VideoUpload = ({ onChange, onRemove, values }: VideoUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1060px)");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: { url: string; fileKey: string }[] | undefined) => {
    if (!result) return console.log("No image uploaded");

    onChange([...values, ...result]);
  };

  if (!isMounted) return null;

  return (
    <div className="mb-5">
      <div className="flex flex-wrap gap-4">
        {values.map((item) => (
          <div
            key={item.url}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={() =>
                  onRemove({ url: item.url, fileKey: item.fileKey })
                }
                variant={"destructive"}
                size={"icon"}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <video controls src={item.url} className="rounded-lg object-cover" />
          </div>
        ))}
      </div>
      <div className="mb-4 mt-2 flex items-center justify-start gap-8">
        {isLargeScreen ? (
          <>
            <UploadDropzone
              endpoint="videoUploader"
              onClientUploadComplete={(res) => {
                onUpload(res);
              }}
            />
          </>
        ) : (
          <>
            <UploadButton
              endpoint="videoUploader"
              onClientUploadComplete={(res) => {
                onUpload(res);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;

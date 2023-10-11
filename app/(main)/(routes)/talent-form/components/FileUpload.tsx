"use client";

import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { UploadFileResponse } from "uploadthing/client";
import useMediaQuery from "@/hooks/useMediaQuery";
import "@uploadthing/react/styles.css";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload = ({ onChange, onRemove, value }: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1060px)");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: UploadFileResponse[] | undefined) => {
    if (!result) return console.log("No image uploaded");

    onChange([...value, ...result.map((item) => item.url)]);
  };

  if (!isMounted) return null;

  return (
    <div className="mb-5">
      <div className="flex flex-wrap gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
          >
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant={"destructive"}
                size={"icon"}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            {url.split(".").pop() === "png" ? (
              <Image
                src={url}
                alt={"Image"}
                fill
                className="object-cover"
                priority
              />
            ) : url.split(".").pop() === "jpg" ? (
              <Image
                src={url}
                alt={"Image"}
                fill
                className="object-cover"
                priority
              />
            ) : url.split(".").pop() === "jpeg" ? (
              <Image
                src={url}
                alt={"Image"}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <video controls src={url} className="rounded-lg" />
            )}
          </div>
        ))}
      </div>
      <div className="mb-4 mt-7 flex items-center justify-start gap-8">
        {isLargeScreen ? (
          <>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                onUpload(res);
              }}
            />
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
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                onUpload(res);
              }}
            />
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

export default ImageUpload;

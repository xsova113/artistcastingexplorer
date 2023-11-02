"use client";

import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import useMediaQuery from "@/hooks/useMediaQuery";
import "@uploadthing/react/styles.css";
import { toast } from "sonner";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (values: { url: string; fileKey: string }[]) => void;
  onRemove: ({ url, fileKey }: { url: string; fileKey: string }) => void;
  values: { url: string; fileKey: string }[];
}

const ImageUpload = ({ onChange, onRemove, values }: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1060px)");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: { url: string; fileKey: string }[] | undefined) => {
    if (!result) return toast.error("No image uploaded");

    onChange([...values, ...result]);
  };

  if (!isMounted) return null;

  return (
    <div className="mb-5">
      <div className="flex flex-wrap gap-4">
        {values?.map((item) => (
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
                disabled={values.length <= 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <Image
              src={item.url}
              alt={"Image"}
              fill
              className="object-cover"
              priority
            />
          </div>
        ))}
      </div>
      <div className="mb-4 mt-2 flex items-center justify-start gap-8">
        {isLargeScreen ? (
          <>
            <UploadDropzone
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                onUpload(res);
              }}
              onUploadError={(error) => {
                toast.error(error.message);
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
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;

"use client";

import { useEffect, useState } from "react";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  return (
    <div className="mb-5">
      <div className="flex items-center gap-4">
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
            {url.split(".").pop() === ("jpg" || "jpeg" || "png") ? (
              <Image
                src={url}
                alt={"Image"}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <video controls src={url} />
            )}
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="pnr4eaw9">
        {({ open }) => (
          <Button
            type="button"
            disabled={disabled}
            variant={"secondary"}
            onClick={() => open()}
            className={cn(value.length > 0 && "mt-3")}
          >
            <ImagePlus className="mr-2 h-4 w-4" />
            Upload an Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;

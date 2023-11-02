"use client";

import { useLightBoxStore } from "@/hooks/useLightBoxStore";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

const MediaLightBox = () => {
  const { isOpen, onClose, media } = useLightBoxStore();
  const mediaType = media.split(".").pop();

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="h-96 bg-primary-foreground shadow-none">
        {mediaType === "jpg" || mediaType === "png" || mediaType === "jpeg" ? (
          <Image src={media} alt={"Image"} fill className="∂ object-contain" />
        ) : (
          <video src={media} controls className="h-[350px] w-[500px]" />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MediaLightBox;

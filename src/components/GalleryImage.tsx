"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface GalleryImageProps {
  src: string;
  alt: string;
}

export default function GalleryImage({ src, alt }: GalleryImageProps) {
  const [zoom, setZoom] = useState(false);

  const toggleZoom = () => setZoom((z) => !z);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative aspect-square overflow-hidden rounded cursor-pointer">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
        <div className="max-h-[90vh] overflow-auto">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className={cn(
              "transition-transform",
              zoom ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
            )}
            onClick={toggleZoom}
            priority
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}


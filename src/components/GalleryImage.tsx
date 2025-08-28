"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImageProps {
  src: string;
  alt: string;
  images: string[];
  index: number;
}

export default function GalleryImage({ src, alt, images, index }: GalleryImageProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(index);
  const [zoom, setZoom] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const toggleZoom = () => setZoom((z) => !z);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    setZoom(false);
  }, [current]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, handleNext, handlePrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const distance = touchStartX - touchEndX;
    if (distance > 50) handleNext();
    else if (distance < -50) handlePrev();
  };

  return (
    <>
      <div
        className="relative aspect-square overflow-hidden rounded cursor-pointer"
        onClick={() => {
          setCurrent(index);
          setOpen(true);
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
          <div
            className="relative max-h-[90vh] overflow-hidden flex items-center justify-center"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              src={images[current]}
              alt={images[current]}
              width={1200}
              height={800}
              className={cn(
                "transition-transform",
                zoom ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
              )}
              onClick={toggleZoom}
              priority
            />
            <button
              onClick={handlePrev}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 p-1 rounded-full hover:bg-background"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={handleNext}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 p-1 rounded-full hover:bg-background"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}


"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
  alt: string;
}

export default function ImageSlider({ images, alt }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  const prev = () => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  };

  const next = () => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full aspect-[3/4] bg-offwhite overflow-hidden group">
      {/* Main image */}
      <Image
        src={images[current]}
        alt={`${alt} - ${current + 1}`}
        fill
        className="object-cover transition-transform duration-300 ease-out"
        sizes="(max-width: 1024px) 100vw, 60vw"
        priority={current === 0}
      />

      {/* Arrow controls — visible on hover */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
            aria-label="Previous image"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 3L5 8L10 13" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
            aria-label="Next image"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 3L11 8L6 13" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 transition-colors duration-200 ${
                i === current ? "bg-primary" : "bg-primary/30"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

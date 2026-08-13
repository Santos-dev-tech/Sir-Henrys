"use client";

/**
 * ProductViewer360 — Drag-to-spin turntable product viewer
 *
 * Renders a sequence of pre-shot turntable frames and lets the user
 * drag horizontally to rotate through them. Falls back to the first
 * product image if no spinFrames are provided.
 *
 * UPGRADE PATH (future):
 * If the client later provides real .glb/.gltf 3D garment models,
 * swap this component's internals for React Three Fiber +
 * @react-three/drei's OrbitControls, keeping the same drag-to-rotate UX
 * but with true lighting/depth. Structure the component so the
 * frame-sequence version and a future R3F version could share the same
 * outer API: <ProductViewer product={product} />
 *
 * The outer wrapper (aspect ratio box, hint overlay, lightbox trigger)
 * stays identical — only the inner rendering layer changes.
 */

import { useState, useRef, useEffect, useCallback } from "react";
import type { Product } from "@/lib/types";

interface ProductViewer360Props {
  product: Product;
  onOpenLightbox?: (frameIndex: number) => void;
}

// Generate a procedural placeholder frame as a data URI
function generatePlaceholderFrame(index: number, total: number): string {
  const hue = Math.round((index / total) * 360);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1067" viewBox="0 0 800 1067">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="hsl(${hue}, 15%, 85%)"/>
        <stop offset="100%" stop-color="hsl(${(hue + 40) % 360}, 20%, 75%)"/>
      </linearGradient>
    </defs>
    <rect width="800" height="1067" fill="url(#g)"/>
    <text x="400" y="480" text-anchor="middle" fill="hsl(${hue}, 30%, 40%)" font-family="Georgia,serif" font-size="120" font-weight="500">${String(index + 1).padStart(2, "0")}</text>
    <text x="400" y="560" text-anchor="middle" fill="hsl(${hue}, 20%, 50%)" font-family="Georgia,serif" font-size="28">of ${total}</text>
    <text x="400" y="640" text-anchor="middle" fill="hsl(${hue}, 15%, 55%)" font-family="Georgia,serif" font-size="18" font-style="italic">Drag to rotate</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export default function ProductViewer360({
  product,
  onOpenLightbox,
}: ProductViewer360Props) {
  const hasSpinFrames = product.spinFrames && product.spinFrames.length > 0;
  const totalFrames = hasSpinFrames ? product.spinFrames.length : 36;

  // Generate placeholder frames if no real spin frames exist
  const frames = hasSpinFrames
    ? product.spinFrames
    : Array.from({ length: 36 }, (_, i) => generatePlaceholderFrame(i, 36));

  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(!hasSpinFrames); // placeholders are instant
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartFrame = useRef(0);
  const loadedImages = useRef<HTMLImageElement[]>([]);
  const autoPlayRef = useRef<number | null>(null);
  const reducedMotion = useRef(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mq.matches;
    if (mq.matches) {
      setIsAutoPlaying(false);
    }
  }, []);

  // Preload all frames
  useEffect(() => {
    if (!hasSpinFrames) {
      setIsLoaded(true);
      setLoadProgress(100);
      return;
    }

    let loaded = 0;
    const images: HTMLImageElement[] = [];

    frames.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / totalFrames) * 100));
        if (loaded === totalFrames) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / totalFrames) * 100));
        if (loaded === totalFrames) {
          setIsLoaded(true);
        }
      };
      images[i] = img;
    });

    loadedImages.current = images;
  }, [frames, hasSpinFrames, totalFrames]);

  // Auto-play single rotation on mount
  useEffect(() => {
    if (!isLoaded || !isAutoPlaying || reducedMotion.current) return;

    const duration = 2500; // 2.5s for one full rotation
    const interval = duration / totalFrames;
    let frame = 0;

    autoPlayRef.current = window.setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        // Completed one full rotation
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
          autoPlayRef.current = null;
        }
        setIsAutoPlaying(false);
        setCurrentFrame(0);
        return;
      }
      setCurrentFrame(frame);
    }, interval);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [isLoaded, isAutoPlaying, totalFrames]);

  // Mouse/pointer drag handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (isAutoPlaying) {
        // Stop auto-play
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
          autoPlayRef.current = null;
        }
        setIsAutoPlaying(false);
      }

      setIsDragging(true);
      dragStartX.current = e.clientX;
      dragStartFrame.current = currentFrame;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [currentFrame, isAutoPlaying]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - dragStartX.current;
      const frameDelta = Math.floor(deltaX / 8);
      let newFrame =
        ((dragStartFrame.current + frameDelta) % totalFrames + totalFrames) %
        totalFrames;
      setCurrentFrame(newFrame);

      if (!hasInteracted) {
        setHasInteracted(true);
      }
    },
    [isDragging, totalFrames, hasInteracted]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Click to open lightbox (only if not dragging)
  const handleClick = useCallback(() => {
    if (isDragging) return;
    onOpenLightbox?.(currentFrame);
  }, [isDragging, currentFrame, onOpenLightbox]);

  // Get current frame source
  const currentSrc = frames[currentFrame] || product.images[0] || "";

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-offwhite overflow-hidden select-none"
      style={{
        aspectRatio: "3 / 4",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
    >
      {/* Current frame image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentSrc}
        alt={`${product.name} — view ${currentFrame + 1} of ${totalFrames}`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Loading progress bar */}
      {!isLoaded && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-brass/20">
          <div
            className="h-full bg-brass transition-all duration-300 spin-progress-pulse"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
      )}

      {/* Hint overlay — fades out after first interaction */}
      {!hasInteracted && !isAutoPlaying && isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-2 bg-primary/30 backdrop-blur-sm px-5 py-3 text-white">
            {/* Rotate icon */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-90"
            >
              <path d="M21 12a9 9 0 1 1-6.22-8.56" />
              <polyline points="21 3 21 9 15 9" />
            </svg>
            <span className="font-ui text-[11px] tracking-[0.12em]">
              Drag to Rotate
            </span>
          </div>
        </div>
      )}

      {/* Frame counter (subtle, bottom-right) */}
      <div className="absolute bottom-3 right-3 font-body text-[11px] text-primary/30">
        {String(currentFrame + 1).padStart(2, "0")}/{totalFrames}
      </div>
    </div>
  );
}

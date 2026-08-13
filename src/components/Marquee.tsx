"use client";

import { siteConfig } from "@/lib/siteConfig";
import { useEffect, useRef, useState } from "react";

export default function Marquee() {
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const items = siteConfig.marqueeItems;
  const separator = " \u2022 ";
  const content = items.join(separator) + separator;

  // If reduced motion, show static centered text
  if (reducedMotion) {
    return (
      <div
        className="w-full bg-navy overflow-hidden select-none flex items-center justify-center"
        style={{ height: "34px" }}
      >
        <span className="font-ui text-[12px] tracking-[0.14em] text-offwhite/90">
          {siteConfig.marqueeText}
        </span>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-navy overflow-hidden select-none"
      style={{ height: "34px" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex items-center h-full whitespace-nowrap"
        style={{
          animation: `marquee-scroll 40s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* Duplicate content for seamless loop */}
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="font-ui text-[12px] tracking-[0.14em] text-offwhite/90 px-6"
          >
            {content}
          </span>
        ))}
      </div>
    </div>
  );
}

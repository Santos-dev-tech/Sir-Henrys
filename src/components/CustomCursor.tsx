"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isDragTarget, setIsDragTarget] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch device
    const hasTouchScreen =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(hasTouchScreen);

    // Detect reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const updateCursorPosition = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${posRef.current.x - 6}px, ${posRef.current.y - 6}px)`;
    }
    rafRef.current = requestAnimationFrame(updateCursorPosition);
  }, []);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    rafRef.current = requestAnimationFrame(updateCursorPosition);

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering an interactive element
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, select, textarea, .product-card-wrapper"
      );
      setIsInteractive(!!interactive);

      // Check if over the 360 viewer
      const viewer360 = target.closest("[data-viewer360]");
      setIsDragTarget(!!viewer360);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch, reducedMotion, isVisible, updateCursorPosition]);

  // Don't render on touch devices or with reduced motion
  if (isTouch || reducedMotion) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        opacity: isVisible ? 1 : 0,
        width: isDragTarget ? "60px" : isInteractive ? "30px" : "12px",
        height: isDragTarget ? "60px" : isInteractive ? "30px" : "12px",
        backgroundColor: isDragTarget
          ? "rgba(27, 42, 74, 0.7)"
          : "#1B2A4A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: isDragTarget ? "-24px" : isInteractive ? "-9px" : "0",
        marginTop: isDragTarget ? "-24px" : isInteractive ? "-9px" : "0",
      }}
    >
      {isDragTarget && (
        <span
          ref={labelRef}
          className="text-white font-ui text-[9px] tracking-[0.1em]"
        >
          Drag
        </span>
      )}
    </div>
  );
}

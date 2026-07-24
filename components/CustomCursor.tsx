"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringX = useRef(0);
  const ringY = useRef(0);

  const isClicking = useRef(false);
  const isHovering = useRef(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      // DOT → instant and centered
      if (dotRef.current) {
        dotRef.current.style.transform = `
          translate(${mouseX.current}px, ${mouseY.current}px)
          translate(-50%, -50%)
        `;
      }

      const target = e.target as HTMLElement;

      isHovering.current =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null;
    };

    const handleDown = () => (isClicking.current = true);
    const handleUp = () => (isClicking.current = false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    // 🔥 Smooth animation loop (ring follows dot)
    const animate = () => {
      // LERP (smooth follow)
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;

      if (ringRef.current) {
        let scale = 1;

        if (isHovering.current) scale = 1.5;
        if (isClicking.current) scale = 0.75;

        ringRef.current.style.transform = `
          translate(${ringX.current}px, ${ringY.current}px)
          translate(-50%, -50%)
          scale(${scale})
        `;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  return (
    <>
      {/* DOT */}
      <div
        ref={dotRef}
        className="custom-cursor fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] bg-amber-400"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />

      {/* RING */}
      <div
        ref={ringRef}
        className="custom-cursor fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] border border-amber-400 origin-center opacity-90 transition-opacity"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
        }}
      />
    </>
  );
}

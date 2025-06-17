"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export default function BrainNetworkImage() {
  const [scale, setScale] = useState(1);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const section1 = document.querySelector("#section1-image");
    if (!section1) return;

    const rect = section1.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );

    const maxDistance = 800;
    // 距离越近，scale越小（最小0.88），距离越远，scale越大（最大1）
    const newScale = 0.88 + (Math.min(distance, maxDistance) / maxDistance) * 0.12;

    setScale(newScale);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="relative w-full aspect-square">
      <div className="absolute inset-0 opacity-90 top-[8vmin] left-[5vmin]">
        <Image
          src="/images/section1-1.png"
          alt="Brain Circuit"
          fill
          className="object-contain max-w-[60vmin] max-h-[60vmin]"
        />
      </div>
      <div
        className="absolute inset-0"
        id="section1-image"
        style={{
          transform: `scale(${scale})`,
          transition: "transform 0.15s ease-out",
          transformOrigin: "center center",
        }}
      >
        <Image
          src="/images/section1.png"
          alt="Brain Network"
          fill
          className="object-contain w-[60vmin] h-[59vmin]"
        />
      </div>
      <div className="absolute right-[9.5vw] top-[5vw] w-[60vmin] h-[60vmin]">
        <Image
          src="/images/decorative-circle.svg"
          alt="Decorative Circle"
          fill
          className="object-contain animate-slow-spin"
        />
      </div>
    </div>
  );
} 
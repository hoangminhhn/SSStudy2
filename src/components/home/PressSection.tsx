"use client";

import React from "react";

interface PressItem {
  id: string;
  image: string;
  alt: string;
}

const PRESS: PressItem[] = [
  { id: "p-1", image: "/images/anhbao.svg", alt: "Báo 1" },
  { id: "p-2", image: "/images/anhbao2.webp", alt: "Báo 2" },
  { id: "p-3", image: "/images/anhbao3.png", alt: "Báo 3" },
  { id: "p-4", image: "/images/anhbao4.png", alt: "Báo 4" },
  // repeat some so marquee feels full
  { id: "p-5", image: "/images/anhbao.svg", alt: "Báo 5" },
  { id: "p-6", image: "/images/anhbao2.webp", alt: "Báo 6" },
];

const PressSection: React.FC = () => {
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Duplicate the array so the marquee loops seamlessly
  const loopItems = [...PRESS, ...PRESS];

  return (
    <section aria-label="Báo chí nói về chúng tôi" className="py-10 bg-white">
      <div className="container mx-auto px-4">

        {/* Inline styles for marquee keyframes */}
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee {
              animation: marquee 24s linear infinite;
            }
            /* ensures the inner track is wide enough and avoids wrapping */
            .marquee-track {
              width: max-content;
              display: flex;
              align-items: center;
              gap: 2rem;
            }
          `}
        </style>

        <div className="overflow-hidden">
          <div
            className="marquee-track animate-marquee"
            // pause animation when user hovers any press item (controlled via inline style below)
            style={{ animationPlayState: hovered !== null ? "paused" : "running", alignItems: "center" }}
            aria-hidden={false}
          >
            {loopItems.map((item, idx) => {
              // Visual index to determine which original item is hovered (if needed)
              const originalIndex = idx % PRESS.length;
              const isHovered = hovered === idx;
              const anyHover = hovered !== null;

              return (
                <div
                  key={`${item.id}-${idx}`}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  role="button"
                  tabIndex={0}
                  className={`flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer select-none ${
                    isHovered
                      ? "scale-105 z-30"
                      : anyHover
                      ? "opacity-40"
                      : "opacity-100"
                  }`}
                  style={{
                    minWidth: 160,
                    // keep consistent height
                    height: 96,
                    WebkitTapHighlightColor: "transparent",
                  }}
                  aria-label={item.alt}
                >
                  <div
                    className={`relative flex items-center justify-center w-full h-full transition-all duration-200`}
                    style={{
                      borderRadius: 12,
                      padding: 8,
                      boxShadow: isHovered ? "0 10px 30px rgba(16,24,40,0.12)" : "none",
                      outline: isHovered ? "3px solid rgba(59,130,246,0.12)" : undefined,
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      className={`w-auto h-full object-contain transition-all duration-200`}
                      style={{
                        filter: isHovered ? "none" : anyHover ? "grayscale(0.6) brightness(0.9)" : "none",
                      }}
                    />
                    {/* Hover blue ring effect using absolutely positioned element */}
                    {isHovered && (
                      <span
                        aria-hidden
                        style={{
                          position: "absolute",
                          inset: -6,
                          borderRadius: 12,
                          boxShadow: "0 0 0 4px rgba(59,130,246,0.12)",
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressSection;
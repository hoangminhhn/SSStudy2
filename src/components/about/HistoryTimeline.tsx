"use client";

import React, { useEffect, useRef, useState } from "react";

type Event = {
  year: string;
  text: string;
  image: string;
  position: "top" | "bottom";
};

const events: Event[] = [
  {
    year: "2011",
    text: "Anh Nguyễn Tiến Đạt bắt đầu dạy gia sư cho các bạn học sinh lớp 10, 11, 12",
    image: "/images/anh-lich-su.png",
    position: "top",
  },
  {
    year: "2013",
    text: "Thành lập lớp toán thầy Đạt với quy mô 15 học sinh/lớp. Phục vụ 60 học sinh/năm",
    image: "/images/anh-lich-su.png",
    position: "bottom",
  },
  {
    year: "2014",
    text: "Thành lập trung tâm luyện thi Tiến Đạt tại Tân Mai - Hoàng Mai, Hà Nội tập các môn: Toán, Lý, Hóa, Anh",
    image: "/images/anh-lich-su.png",
    position: "top",
  },
  {
    year: "2016",
    text: "Mở rộng quy mô trung tâm luyện thi Tiến Đạt với quy mô 80 học sinh/lớp, phục vụ 1800 học sinh/năm",
    image: "/images/anh-lich-su.png",
    position: "bottom",
  },
  // You can append more events here to test horizontal scrolling on desktop.
];

/**
 * Layout constants (change these to tweak spacing)
 */
const TOP_BOX_HEIGHT = 140; // px: reserved vertical space for top cards
const CENTER_BOX_HEIGHT = 72; // px: center area where the dots/line live
const BOTTOM_BOX_HEIGHT = 140; // px: reserved vertical space for bottom cards
const DOT_SIZE = 14; // px diameter of the dot
const ITEM_MIN_WIDTH = 300; // desktop item min width for horizontal track

const HistoryTimeline: React.FC = () => {
  // Total timeline height (desktop) so we can avoid overlap with heading
  const totalHeight = TOP_BOX_HEIGHT + CENTER_BOX_HEIGHT + BOTTOM_BOX_HEIGHT;

  // Compute dashed line position in px from top of the timeline container
  // Place it roughly in the middle of the center box
  const dashedTop = TOP_BOX_HEIGHT + Math.round(CENTER_BOX_HEIGHT / 2) - Math.round(DOT_SIZE / 2);

  // Mobile carousel state
  const [mobileIndex, setMobileIndex] = React.useState(0);

  // Desktop scroll state & refs
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Dragging state for desktop track
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const updateArrows = () => {
      setShowLeftArrow(el.scrollLeft > 4);
      setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    updateArrows();

    const onResize = () => updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", onResize);

    // interval to catch layout changes
    const interval = setInterval(updateArrows, 300);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", onResize);
      clearInterval(interval);
    };
  }, []);

  const scrollTrackBy = (amount: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current.active = true;
    dragState.current.startX = e.clientX;
    dragState.current.scrollLeft = el.scrollLeft;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    el.classList.add("cursor-grabbing");
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !dragState.current.active) return;
    const x = e.clientX;
    const walk = x - dragState.current.startX;
    el.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    dragState.current.active = false;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
    el.classList.remove("cursor-grabbing");
  };

  const prevMobile = () => {
    setMobileIndex((i) => (i - 1 + events.length) % events.length);
  };
  const nextMobile = () => {
    setMobileIndex((i) => (i + 1) % events.length);
  };

  // Helper to present a readable date on mobile header (keeps same sample date as design)
  const mobileHeaderDate = "27 August 2025";

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Full-width heading that centers an inline-block span */}
        <h2 className="relative z-30 w-full text-center mb-36">
          <span className="text-2xl md:text-3xl font-bold text-slate-900 bg-gray-50 inline-block px-4 py-2 rounded">
            Lịch sử hình thành và phát triển
          </span>
        </h2>

        {/* Desktop / large: horizontal track with arrows (scrollable) */}
        <div
          className="hidden md:block relative"
          style={{ minHeight: totalHeight + 40, paddingTop: 8 }}
          aria-hidden={false}
        >
          {/* Center dashed line (stays full width visually) */}
          <div
            className="absolute inset-x-0 pointer-events-none"
            style={{
              top: `${dashedTop}px`,
            }}
            role="presentation"
          >
            <div className="w-full border-t-2 border-dashed border-gray-300" />
          </div>

          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              aria-label="Scroll left"
              onClick={() => scrollTrackBy(-Math.round((trackRef.current?.clientWidth ?? 800) * 0.6))}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-800">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              aria-label="Scroll right"
              onClick={() => scrollTrackBy(Math.round((trackRef.current?.clientWidth ?? 800) * 0.6))}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-800">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Scrollable track: single-row flex, items have min-width so they form slides */}
          <div
            ref={trackRef}
            className="relative z-10 flex gap-x-8 overflow-x-auto no-scrollbar py-6 px-2 touch-pan-x"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {events.map((ev, idx) => {
              const isTop = ev.position === "top";
              const isFirst = idx === 0;
              const dotColor = isFirst ? "bg-orange-400" : "bg-blue-500";
              const ringColor = isFirst ? "ring-orange-200" : "ring-blue-200";

              return (
                <div
                  key={ev.year}
                  className="flex-shrink-0"
                  style={{ minWidth: ITEM_MIN_WIDTH }}
                >
                  {/* item card */}
                  <div className="relative flex flex-col items-center">
                    {/* Top portion */}
                    <div className="w-full flex items-end justify-center" style={{ height: TOP_BOX_HEIGHT }}>
                      {isTop ? (
                        <div className="w-full max-w-[260px]">
                          <img src={ev.image} alt={`${ev.year} image`} className="w-full h-28 object-cover rounded-md shadow-sm mb-3" />
                          <div>
                            <div className="text-lg font-semibold text-gray-800">{ev.year}</div>
                            <p className="text-sm text-gray-600 mt-2 leading-snug">{ev.text}</p>
                          </div>
                        </div>
                      ) : (
                        <div style={{ height: 0 }} />
                      )}
                    </div>

                    {/* center dot */}
                    <div className="w-full flex items-center justify-center" style={{ height: CENTER_BOX_HEIGHT }}>
                      <span
                        className={`${dotColor} ${ringColor} ring-4 ring-white shadow-md rounded-full inline-block`}
                        style={{
                          width: DOT_SIZE,
                          height: DOT_SIZE,
                        }}
                        aria-hidden
                      />
                    </div>

                    {/* Bottom portion */}
                    <div className="w-full flex items-start justify-center" style={{ height: BOTTOM_BOX_HEIGHT }}>
                      {!isTop ? (
                        <div className="w-full max-w-[260px]">
                          <div>
                            <div className="text-lg font-semibold text-gray-800">{ev.year}</div>
                            <p className="text-sm text-gray-600 mt-2 leading-snug">{ev.text}</p>
                          </div>
                          <img src={ev.image} alt={`${ev.year} image`} className="w-full h-28 object-cover rounded-md shadow-sm mt-3" />
                        </div>
                      ) : (
                        <div style={{ height: 0 }} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: show single-card carousel with header/date and navigation (unchanged) */}
        <div className="md:hidden">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-4 w-full max-w-md">
              <button
                onClick={() => setMobileIndex((i) => (i - 1 + events.length) % events.length)}
                aria-label="Trước"
                className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-800">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex-1 text-center">
                <div className="text-xs text-gray-500">{mobileHeaderDate}</div>
                <div className="flex items-center justify-center mt-2">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="4" width="18" height="16" rx="2" stroke="white" strokeWidth="1.2" />
                      <path d="M8 2v4M16 2v4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileIndex((i) => (i + 1) % events.length)}
                aria-label="Tiếp"
                className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-800">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Active event card */}
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <img src={events[mobileIndex].image} alt={events[mobileIndex].year} className="w-full h-44 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold leading-snug mb-1 text-gray-900">
                {events[mobileIndex].text}
              </h3>
            </div>
          </div>

          {/* Dots */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {events.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full ${i === mobileIndex ? "bg-indigo-600" : "bg-gray-300"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
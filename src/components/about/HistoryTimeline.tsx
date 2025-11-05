"use client";

import React from "react";

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
];

/**
 * Layout constants (change these to tweak spacing)
 */
const TOP_BOX_HEIGHT = 140; // px: reserved vertical space for top cards
const CENTER_BOX_HEIGHT = 72; // px: center area where the dots/line live
const BOTTOM_BOX_HEIGHT = 140; // px: reserved vertical space for bottom cards
const DOT_SIZE = 14; // px diameter of the dot

const HistoryTimeline: React.FC = () => {
  // Total timeline height (desktop) so we can avoid overlap with heading
  const totalHeight = TOP_BOX_HEIGHT + CENTER_BOX_HEIGHT + BOTTOM_BOX_HEIGHT;

  // Compute dashed line position in px from top of the timeline container
  // Place it roughly in the middle of the center box
  const dashedTop = TOP_BOX_HEIGHT + Math.round(CENTER_BOX_HEIGHT / 2) - Math.round(DOT_SIZE / 2);

  // Mobile carousel state
  const [mobileIndex, setMobileIndex] = React.useState(0);

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

        {/* Desktop / large: horizontal 4-column timeline (unchanged) */}
        <div
          className="hidden md:block relative"
          style={{ minHeight: totalHeight + 40, paddingTop: 8 }} // extra room to avoid overlapping the heading
          aria-hidden={false}
        >
          {/* Center dashed line positioned using computed px value so it never overlaps the heading */}
          <div
            className="absolute inset-x-0 pointer-events-none"
            style={{
              top: `${dashedTop}px`,
            }}
            role="presentation"
          >
            <div className="w-full border-t-2 border-dashed border-gray-300" />
          </div>

          <div className="grid grid-cols-4 gap-x-8">
            {events.map((ev, idx) => {
              const isTop = ev.position === "top";
              const isFirst = idx === 0;
              const dotColor = isFirst ? "bg-orange-400" : "bg-blue-500";
              const ringColor = isFirst ? "ring-orange-200" : "ring-blue-200";

              return (
                <div key={ev.year} className="relative flex flex-col items-center">
                  {/* Top box (fixed height) — if item is top, card sits here, bottom-aligned */}
                  <div
                    className="w-full flex items-end justify-center"
                    style={{ height: `${TOP_BOX_HEIGHT}px` }}
                  >
                    {isTop ? (
                      <div className="max-w-xs w-full text-left">
                        <img
                          src={ev.image}
                          alt={`${ev.year} image`}
                          className="w-full h-28 object-cover rounded-md shadow-sm mb-3 relative z-10"
                        />
                        <div>
                          <div className="text-lg font-semibold text-gray-800">{ev.year}</div>
                          <p className="text-sm text-gray-600 mt-2 leading-snug">{ev.text}</p>
                        </div>
                      </div>
                    ) : (
                      <div style={{ height: 0 }} />
                    )}
                  </div>

                  {/* Center box contains the dot and small vertical connector */}
                  <div
                    className="w-full flex items-center justify-center relative"
                    style={{ height: `${CENTER_BOX_HEIGHT}px` }}
                  >
                    {/* Vertical connector: top */}
                    {isTop && (
                      <div
                        className="absolute"
                        style={{
                          left: "50%",
                          transform: "translateX(-50%)",
                          bottom: `${CENTER_BOX_HEIGHT / 2 + DOT_SIZE / 2}px`,
                          width: 2,
                          height: `${(CENTER_BOX_HEIGHT / 2) + 12}px`,
                          background: "#E5E7EB",
                        }}
                        aria-hidden
                      />
                    )}

                    {/* Vertical connector: bottom */}
                    {!isTop && (
                      <div
                        className="absolute"
                        style={{
                          left: "50%",
                          transform: "translateX(-50%)",
                          top: `${CENTER_BOX_HEIGHT / 2 + DOT_SIZE / 2}px`,
                          width: 2,
                          height: `${(CENTER_BOX_HEIGHT / 2) + 12}px`,
                          background: "#E5E7EB",
                        }}
                        aria-hidden
                      />
                    )}

                    {/* Dot */}
                    <span
                      className={`${dotColor} ${ringColor} ring-4 ring-white shadow-md rounded-full inline-block`}
                      style={{
                        width: DOT_SIZE,
                        height: DOT_SIZE,
                        zIndex: 20,
                      }}
                      aria-hidden
                    />
                  </div>

                  {/* Bottom box (fixed height) — if item is bottom, card sits here, top-aligned */}
                  <div
                    className="w-full flex items-start justify-center"
                    style={{ height: `${BOTTOM_BOX_HEIGHT}px` }}
                  >
                    {!isTop ? (
                      <div className="max-w-xs w-full text-left">
                        <div>
                          <div className="text-lg font-semibold text-gray-800">{ev.year}</div>
                          <p className="text-sm text-gray-600 mt-2 leading-snug">{ev.text}</p>
                        </div>
                        <img
                          src={ev.image}
                          alt={`${ev.year} image`}
                          className="w-full h-28 object-cover rounded-md shadow-sm mt-3 relative z-10"
                        />
                      </div>
                    ) : (
                      <div style={{ height: 0 }} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: show single-card carousel with header/date and navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-4 w-full max-w-md">
              <button
                onClick={prevMobile}
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
                onClick={nextMobile}
                aria-label="Tiếp"
                className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-800">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Active event card (cleaned: only image + title) */}
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
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

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Full-width heading that centers an inline-block span */}
        <h2 className="relative z-30 w-full text-center mb-36">
          <span className="text-2xl md:text-3xl font-bold text-slate-900 bg-gray-50 inline-block px-4 py-2 rounded">
            Lịch sử hình thành và phát triển
          </span>
        </h2>

        {/* Desktop / large: horizontal 4-column timeline */}
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

        {/* Mobile: stacked vertical timeline — image + text together and small dot on left */}
        <div className="md:hidden relative">
          <div className="space-y-8">
            {events.map((ev, idx) => {
              const isFirst = idx === 0;
              const dotColor = isFirst ? "bg-orange-400" : "bg-blue-500";
              return (
                <div key={ev.year} className="flex items-start">
                  <div className="w-12 flex flex-col items-center">
                    <div className="h-6 flex items-center">
                      <div className={`w-3 h-3 rounded-full ${dotColor} ring-2 ring-white`} />
                    </div>
                    {idx < events.length - 1 && <div className="flex-1 w-px bg-gray-300 mt-2" />}
                  </div>

                  <div className="ml-4 bg-white rounded-md p-3 shadow-sm flex-1">
                    <img
                      src={ev.image}
                      alt={`${ev.year} image`}
                      className="w-full h-36 object-cover rounded-md mb-3"
                    />
                    <div>
                      <div className="text-lg font-semibold text-gray-800">{ev.year}</div>
                      <p className="text-sm text-gray-600 mt-2 leading-snug">{ev.text}</p>
                    </div>
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

export default HistoryTimeline;
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
    image: "/images/20250630150800-ugrw2nuezq.png",
    position: "top",
  },
  {
    year: "2013",
    text: "Thành lập lớp toán thầy Đạt với quy mô 15 học sinh/lớp. Phục vụ 60 học sinh/năm",
    image: "/images/20250630150800-ugrw2nuezq.png",
    position: "bottom",
  },
  {
    year: "2014",
    text: "Thành lập trung tâm luyện thi Tiến Đạt tại Tân Mai - Hoàng Mai, Hà Nội tập các môn: Toán, Lý, Hóa, Anh",
    image: "/images/20250630150800-ugrw2nuezq.png",
    position: "top",
  },
  {
    year: "2016",
    text: "Mở rộng quy mô trung tâm luyện thi Tiến Đạt với quy mô 80 học sinh/lớp, phục vụ 1800 học sinh/năm",
    image: "/images/20250630150800-ugrw2nuezq.png",
    position: "bottom",
  },
];

const DOT_SIZE = 14;
const TOP_BOX_HEIGHT = 140; // px
const CENTER_BOX_HEIGHT = 72;
const BOTTOM_BOX_HEIGHT = 140;

const HistoryTimeline: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-10">
          Lịch sử hình thành và phát triển
        </h2>

        {/* Desktop / large: horizontal 4-column timeline */}
        <div className="hidden md:block relative">
          {/* Center dashed line area */}
          <div
            className="absolute inset-x-0"
            style={{
              top: `calc(50% - ${DOT_SIZE / 2}px)`,
              height: `${DOT_SIZE}px`,
            }}
            aria-hidden
          >
            <div className="w-full border-t-2 border-dashed border-gray-300" />
          </div>

          <div className="grid grid-cols-4 gap-x-8">
            {events.map((ev, idx) => {
              const isTop = ev.position === "top";
              const isFirst = idx === 0;
              const dotColor = isFirst ? "bg-orange-400" : "bg-blue-500";
              const dotRing = isFirst ? "ring-orange-200" : "ring-blue-200";

              return (
                <div key={ev.year} className="relative flex flex-col items-center">
                  {/* Top box (fixed height) — if item is top, card sits here, bottom-aligned */}
                  <div
                    className="w-full flex items-end justify-center"
                    style={{ height: `${TOP_BOX_HEIGHT}px` }}
                  >
                    {isTop ? (
                      <div className="max-w-xs w-full">
                        <img
                          src={ev.image}
                          alt={`${ev.year} image`}
                          className="w-full h-28 object-cover rounded-md shadow-sm mb-3"
                        />
                        <div className="pl-0">
                          <div className="text-lg font-semibold text-gray-800">{ev.year}</div>
                          <p className="text-sm text-gray-600 mt-2 leading-snug">{ev.text}</p>
                        </div>
                      </div>
                    ) : (
                      <div /> /* empty to reserve space */
                    )}
                  </div>

                  {/* Center box contains dashed line (full-width) and dot; we also add small vertical connector pieces here */}
                  <div
                    className="w-full flex items-center justify-center relative"
                    style={{ height: `${CENTER_BOX_HEIGHT}px` }}
                  >
                    {/* Short vertical connector from dot upward (for top cards) */}
                    {isTop && (
                      <div
                        className="absolute"
                        style={{
                          left: "50%",
                          transform: "translateX(-50%)",
                          bottom: `${CENTER_BOX_HEIGHT / 2 + DOT_SIZE / 2}px`,
                          width: 2,
                          height: `${(CENTER_BOX_HEIGHT / 2) + 12}px`,
                          background: "#E5E7EB", // gray-300
                        }}
                        aria-hidden
                      />
                    )}

                    {/* Short vertical connector from dot downward (for bottom cards) */}
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

                    {/* Dot positioned centered over dashed line */}
                    <div
                      className={`w-${DOT_SIZE} h-${DOT_SIZE} rounded-full ${dotColor} ${dotRing} ring-4 ring-white shadow-md`}
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
                      <div className="max-w-xs w-full">
                        <div className="pl-0">
                          <div className="text-lg font-semibold text-gray-800">{ev.year}</div>
                          <p className="text-sm text-gray-600 mt-2 leading-snug">{ev.text}</p>
                        </div>
                        <img
                          src={ev.image}
                          alt={`${ev.year} image`}
                          className="w-full h-28 object-cover rounded-md shadow-sm mt-3"
                        />
                      </div>
                    ) : (
                      <div /> /* empty to reserve space */
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
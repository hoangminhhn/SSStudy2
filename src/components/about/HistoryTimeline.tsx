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

const dotSize = 18;

const HistoryTimeline: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-10">
          Lịch sử hình thành và phát triển
        </h2>

        <div className="relative">
          {/* center dashed line */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-full border-t-2 border-dashed border-gray-300" />
          </div>

          {/* grid columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 items-start">
            {events.map((ev, idx) => {
              const isTop = ev.position === "top";
              const isFirst = idx === 0;
              const dotColor = isFirst ? "bg-orange-400" : "bg-blue-500";
              const ringColor = isFirst ? "ring-orange-200" : "ring-blue-200";

              return (
                <div key={ev.year} className="relative flex flex-col items-center">
                  {/* If top: card above the line */}
                  {isTop ? (
                    <>
                      <div className="flex flex-col items-center max-w-xs text-center">
                        <img
                          src={ev.image}
                          alt={`${ev.year} image`}
                          className="w-full h-28 object-cover rounded-md shadow-sm mb-3"
                        />
                        <div className="text-left">
                          <div className="text-lg font-semibold text-gray-800">{ev.year}</div>
                          <p className="text-sm text-gray-600 mt-2">{ev.text}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* empty space above so bottom cards sit lower */}
                      <div style={{ height: 120 }} />
                    </>
                  )}

                  {/* Dot + vertical connector */}
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2"
                    style={{ top: "50%" }}
                  >
                    {/* vertical connector to top card */}
                    {isTop ? (
                      <div
                        className="mx-auto"
                        style={{
                          width: 2,
                          height: 56,
                          background: "transparent",
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "center",
                        }}
                        aria-hidden
                      >
                        <div className="w-[2px] h-14 bg-gray-300" />
                      </div>
                    ) : (
                      <div
                        className="mx-auto"
                        style={{
                          width: 2,
                          height: 56,
                          background: "transparent",
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "center",
                        }}
                        aria-hidden
                      >
                        <div className="w-[2px] h-14 bg-gray-300" />
                      </div>
                    )}

                    <div
                      className={`w-${dotSize} h-${dotSize} rounded-full ${dotColor} ${ringColor} ring-4 ring-white shadow-lg inline-block mt-[-9px]`}
                      style={{ width: dotSize, height: dotSize }}
                      aria-hidden
                    />

                    {/* small dashed extension to the right to visually match connected dots (optional) */}
                  </div>

                  {/* If bottom: card below the line */}
                  {!isTop && (
                    <div className="mt-6 flex flex-col items-center max-w-xs text-center">
                      <div className="text-left">
                        <div className="text-lg font-semibold text-gray-800">{ev.year}</div>
                        <p className="text-sm text-gray-600 mt-2">{ev.text}</p>
                      </div>
                      <img
                        src={ev.image}
                        alt={`${ev.year} image`}
                        className="w-full h-28 object-cover rounded-md shadow-sm mt-3"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* decorative small blue nodes between dots (to mimic image) */}
          <div className="hidden lg:block pointer-events-none">
            {/* Place small nodes aligned on the center line between grid columns */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6">
              {/* There will be 3 gaps between 4 columns; render small nodes at those positions */}
              <div className="w-0" />
              <div className="w-0" />
              <div className="w-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
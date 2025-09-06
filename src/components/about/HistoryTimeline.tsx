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
    text: "Thành lập trung tâm luyện thi Đại học Tiến Đạt tại Tân Mai - Hoàng Mai, Hà Nội tập các môn: Toán, Lý, Hóa, Anh",
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

const HistoryTimeline: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-10">
          Lịch sử hình thành và phát triển
        </h2>

        {/* Desktop: horizontal grid timeline */}
        <div className="hidden md:block relative">
          {/* Horizontal dashed line */}
          <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2">
            <div className="w-full border-t-2 border-dashed border-gray-300" />
          </div>

          <div className="grid grid-cols-4 gap-x-8 items-center">
            {events.map((ev, idx) => {
              const isTop = ev.position === "top";
              const nodeColor =
                idx === 0 ? "bg-red-400 ring-red-200" : "bg-blue-500 ring-blue-200";
              return (
                <div key={ev.year} className="flex flex-col items-center relative">
                  {/* For top items: card above the line */}
                  {isTop ? (
                    <>
                      <div className="mb-6 w-full max-w-xs">
                        <img
                          src={ev.image}
                          alt={`${ev.year} image`}
                          className="w-full h-36 object-cover rounded-md shadow-sm"
                        />
                        <div className="mt-3">
                          <div className="text-lg font-semibold text-gray-800">{ev.year}</div>
                          <p className="text-sm text-gray-600 mt-2">{ev.text}</p>
                        </div>
                      </div>
                      {/* Node aligned to center line */}
                      <div className={`z-10 w-4 h-4 rounded-full ${nodeColor} ring-4 ring-white -mt-1`} />
                    </>
                  ) : (
                    <>
                      {/* Node then card below */}
                      <div className={`z-10 w-4 h-4 rounded-full ${nodeColor} ring-4 ring-white mb-1`} />
                      <div className="mt-6 w-full max-w-xs">
                        <img
                          src={ev.image}
                          alt={`${ev.year} image`}
                          className="w-full h-36 object-cover rounded-md shadow-sm"
                        />
                        <div className="mt-3">
                          <div className="text-lg font-semibold text-gray-800">{ev.year}</div>
                          <p className="text-sm text-gray-600 mt-2">{ev.text}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative">
          {/* Vertical dashed line on left */}
          <div className="absolute left-8 top-0 bottom-0">
            <div className="h-full border-l-2 border-dashed border-gray-300" />
          </div>

          <div className="space-y-8">
            {events.map((ev, idx) => {
              const nodeColor =
                idx === 0 ? "bg-red-400 ring-red-200" : "bg-blue-500 ring-blue-200";
              return (
                <div key={ev.year} className="flex items-start pl-16">
                  <div className="absolute left-6">
                    <div className={`w-4 h-4 rounded-full ${nodeColor} ring-4 ring-white`} />
                  </div>
                  <div className="w-full bg-white rounded-md p-4 shadow-sm">
                    <div className="flex items-start gap-4">
                      <img
                        src={ev.image}
                        alt={`${ev.year} image`}
                        className="w-24 h-24 object-cover rounded-md flex-shrink-0"
                      />
                      <div>
                        <div className="text-lg font-semibold text-gray-800">{ev.year}</div>
                        <p className="text-sm text-gray-600 mt-1">{ev.text}</p>
                      </div>
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
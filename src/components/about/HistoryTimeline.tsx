"use client";

import React from "react";

type TimelineItem = {
  year: string;
  title?: string;
  description: string;
  image?: string;
  position: "top" | "bottom";
};

const timeline: TimelineItem[] = [
  {
    year: "2011",
    title: "",
    description:
      "Anh Nguyễn Tiến Đạt bắt đầu dạy gia sư cho các bạn học sinh lớp 10, 11, 12",
    image: "/images/lich-su-hinh-thanh.png",
    position: "top",
  },
  {
    year: "2013",
    title: "",
    description:
      "Thành lập lớp toán thầy Đạt với quy mô 15 học sinh/lớp. Phục vụ 60 học sinh/năm",
    image: "/images/lich-su-hinh-thanh.png",
    position: "bottom",
  },
  {
    year: "2014",
    title: "",
    description:
      "Thành lập trung tâm luyện thi Đại học Tiến Đạt tại Tân Mai - Hoàng Mai, Hà Nội. Đào tạo các môn: Toán, Lý, Hóa, Anh",
    image: "/images/lich-su-hinh-thanh.png",
    position: "top",
  },
  {
    year: "2016",
    title: "",
    description:
      "Mở rộng quy mô trung tâm luyện thi Đại học Tiến Đạt tại Tạ Quang Bửu với quy mô 80 học sinh/lớp. Phục vụ 1800 học sinh/năm",
    image: "/images/lich-su-hinh-thanh.png",
    position: "bottom",
  },
];

const HistoryTimeline: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-slate-900 mb-10">
          Lịch sử hình thành và phát triển
        </h2>

        {/* Desktop: 4-column horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* center dashed line across the whole grid */}
          <div className="absolute inset-x-0 top-1/2 h-px border-t-2 border-dashed border-slate-300 -translate-y-1/2" />

          <div className="grid grid-cols-4 gap-8">
            {timeline.map((item, idx) => (
              // Each cell has fixed height so we can split it into top/bottom halves.
              <div key={idx} className="relative h-72">
                {/* Dot positioned exactly in the vertical center of the cell */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20"
                  aria-hidden
                >
                  <div
                    className={`w-4 h-4 rounded-full ring-4 ring-white shadow ${
                      item.position === "top" ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  />
                </div>

                {/* Top half area */}
                <div className="absolute inset-x-0 top-0 h-1/2 flex items-end justify-center p-4">
                  {item.position === "top" ? (
                    <div className="w-full max-w-xs">
                      <div className="overflow-hidden rounded-md shadow">
                        <img src={item.image} alt={item.year} className="w-full h-36 object-cover" />
                      </div>
                      <div className="mt-4 bg-white p-4 border border-slate-100 rounded">
                        <div className="text-lg font-semibold text-slate-900">{item.year}</div>
                        <p className="text-sm text-slate-600 mt-2">{item.description}</p>
                      </div>
                    </div>
                  ) : (
                    // empty placeholder to keep top half visually empty for bottom items
                    <div className="w-full max-w-xs" aria-hidden />
                  )}
                </div>

                {/* Bottom half area */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-start justify-center p-4">
                  {item.position === "bottom" ? (
                    <div className="w-full max-w-xs">
                      <div className="overflow-hidden rounded-md shadow">
                        <img src={item.image} alt={item.year} className="w-full h-36 object-cover" />
                      </div>
                      <div className="mt-4 bg-white p-4 border border-slate-100 rounded">
                        <div className="text-lg font-semibold text-slate-900">{item.year}</div>
                        <p className="text-sm text-slate-600 mt-2">{item.description}</p>
                      </div>
                    </div>
                  ) : (
                    // empty placeholder to keep bottom half visually empty for top items
                    <div className="w-full max-w-xs" aria-hidden />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stacked timeline (unchanged) */}
        <div className="lg:hidden">
          <div className="relative pl-8">
            {/* vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-2 top-2">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        item.position === "top" ? "bg-blue-600" : "bg-slate-300"
                      } ring-4 ring-white`}
                    />
                  </div>
                  <div className="pl-6">
                    <div className="overflow-hidden rounded-md shadow mb-3">
                      <img src={item.image} alt={item.year} className="w-full h-40 object-cover" />
                    </div>
                    <div className="bg-white p-4 border border-slate-100 rounded">
                      <div className="text-lg font-semibold text-slate-900">{item.year}</div>
                      <p className="text-sm text-slate-600 mt-2">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
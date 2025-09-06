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

        {/* Desktop: 4-column timeline with 3 rows (top / center / bottom) */}
        <div className="hidden lg:block relative">
          {/* dashed center line (behind content) */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden
          >
            <div className="h-px border-t-2 border-dashed border-slate-300" />
          </div>

          {/* Grid: 4 columns; 3 rows (top content, center dot row, bottom content).
              Using explicit grid rows ensures all content remains in normal flow
              and nothing overlaps other sections. */}
          <div className="grid grid-cols-4 grid-rows-[1fr_auto_1fr] gap-8 items-start">
            {timeline.map((item, idx) => (
              <React.Fragment key={idx}>
                {/* Top cell (row 1) */}
                <div className="flex items-end justify-center">
                  {item.position === "top" ? (
                    <div className="w-full max-w-xs">
                      <div className="overflow-hidden rounded-md shadow">
                        <img
                          src={item.image}
                          alt={item.year}
                          className="w-full h-36 object-cover"
                        />
                      </div>
                      <div className="mt-4 bg-white p-4 border border-slate-100 rounded">
                        <div className="text-lg font-semibold text-slate-900">
                          {item.year}
                        </div>
                        <p className="text-sm text-slate-600 mt-2">{item.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-xs" aria-hidden />
                  )}
                </div>

                {/* Center cell (row 2) - contains dot */}
                <div className="flex items-center justify-center">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <div
                      className={`w-4 h-4 rounded-full ring-4 ring-white shadow ${
                        item.position === "top" ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    />
                  </div>
                </div>

                {/* Bottom cell (row 3) */}
                <div className="flex items-start justify-center">
                  {item.position === "bottom" ? (
                    <div className="w-full max-w-xs">
                      <div className="overflow-hidden rounded-md shadow">
                        <img
                          src={item.image}
                          alt={item.year}
                          className="w-full h-36 object-cover"
                        />
                      </div>
                      <div className="mt-4 bg-white p-4 border border-slate-100 rounded">
                        <div className="text-lg font-semibold text-slate-900">
                          {item.year}
                        </div>
                        <p className="text-sm text-slate-600 mt-2">{item.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full max-w-xs" aria-hidden />
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile: stacked vertical timeline (unchanged) */}
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
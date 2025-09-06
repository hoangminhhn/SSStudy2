"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const PRESS_ITEMS = [
  {
    id: "pc-1",
    title: "Thầy Nguyễn Tiến Đạt chia sẻ phương pháp ôn luyện hiệu quả",
    date: "05/08/2025",
    image: "/images/anhdoitac1.png",
  },
  {
    id: "pc-2",
    title: "Chất lượng đào tạo và cam kết đầu ra tại SSStudy",
    date: "04/08/2025",
    image: "/images/anhdoitac2.png",
  },
  {
    id: "pc-3",
    title: "SSStudy đồng hành cùng chương trình giáo dục sáng tạo",
    date: "01/08/2025",
    image: "/images/anhdoitac3.png",
  },
];

const PressCoverage: React.FC = () => {
  return (
    <section aria-labelledby="press-coverage-heading" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2
          id="press-coverage-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 text-center mb-4"
        >
          Báo chí nói về thầy Nguyễn Tiến Đạt
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Những bài viết nổi bật, phóng sự và bài phỏng vấn về hành trình phát triển giáo dục, phương pháp giảng dạy và
          những đóng góp của thầy Nguyễn Tiến Đạt cho cộng đồng học tập.
        </p>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRESS_ITEMS.map((item) => (
              <Card key={item.id} className="overflow-hidden shadow-sm">
                <div className="w-full h-44 bg-gray-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                    <div className="text-xs text-gray-400 flex items-center">
                      <CalendarDays size={14} className="mr-1" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Bài viết nêu bật các chiến lược giảng dạy, các kết quả học tập và tầm nhìn giáo dục của thầy, cùng
                    những chia sẻ thực tế từ học sinh và phụ huynh.
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="inline-flex items-center px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
              Xem tất cả bài viết
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressCoverage;
"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, BookOpen, Cpu, FileText, ChevronRight } from "lucide-react";

const features = [
  {
    id: "f-1",
    title: "Phương pháp tư duy COD",
    desc: "Phương pháp giúp học sinh phát triển tư duy giải quyết vấn đề, tập trung vào cách suy luận và lập luận hiệu quả.",
    icon: Zap,
    bg: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    id: "f-2",
    title: "Tư liệu học tập độc quyền",
    desc: "Bộ tài liệu do đội ngũ chuyên môn biên soạn, cập nhật sát đề thi và thực hành theo lộ trình rõ ràng.",
    icon: BookOpen,
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "f-3",
    title: "Công nghệ học tập toàn diện",
    desc: "Nền tảng hỗ trợ tương tác, theo dõi tiến trình và ôn luyện thông minh, giúp tối ưu thời gian học tập.",
    icon: Cpu,
    bg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    id: "f-4",
    title: "Phương pháp học tập bài bản",
    desc: "Lộ trình bài bản, hệ thống hoá kiến thức giúp học sinh nắm vững nền tảng trước khi nâng cao.",
    icon: FileText,
    bg: "bg-green-50",
    iconColor: "text-green-600",
  },
];

const UniqueValuesSection: React.FC = () => {
  return (
    <section aria-labelledby="unique-values-heading" className="py-12 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Heading row */}
        <div className="grid grid-cols-3 items-center mb-8">
          <div />
          <h2
            id="unique-values-heading"
            className="text-center text-2xl sm:text-3xl font-bold text-slate-900"
          >
            Giá trị khác biệt tại SSStudy
          </h2>
          <div className="text-right">
            <Link to="#" className="text-sm text-blue-600 hover:underline inline-flex items-center">
              Xem tất cả <ChevronRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: teacher image with larger blue block behind */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[440px]">
              {/* Blue rounded rectangle behind (slightly larger) */}
              <div
                className="hidden sm:block absolute -left-10 top-10 w-96 h-96 rounded-lg bg-blue-100"
                aria-hidden
              />
              {/* Image (larger square) with extra padding so PNG head isn't cut */}
              <div
                className="relative z-10 w-80 h-80 rounded-lg overflow-hidden shadow-md bg-white p-6"
                style={{ aspectRatio: "1 / 1" }}
              >
                {/* Use object-contain + object-top so full PNG (including head) is visible and aligned to top */}
                <img
                  src="/images/anh-giao-vien.png"
                  alt="Giáo viên SSStudy"
                  className="w-full h-full object-contain object-top"
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </div>

          {/* Right: 4 cards in 2x2 grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <Card key={f.id} className="shadow-sm rounded-md border border-gray-100">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-md flex items-center justify-center ${f.bg} shrink-0`}>
                          <Icon className={`${f.iconColor}`} size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
                          <p className="text-sm text-gray-500 mt-2">{f.desc}</p>
                          <div className="mt-4">
                            <Link to="#" className="inline-flex items-center text-sm text-blue-600 hover:underline">
                              Tìm hiểu thêm <ChevronRight className="ml-2" size={14} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniqueValuesSection;
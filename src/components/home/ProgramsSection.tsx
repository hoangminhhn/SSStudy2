"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, User, CalendarDays, Globe, FileText, Star } from "lucide-react";

interface Program {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight?: string;
  to?: string;
}

const PROGRAMS: Program[] = [
  {
    id: "p-1",
    title: "Luyện thi ĐGNL - ĐGTD",
    description: "Chuẩn bị kỹ năng & chiến thuật làm bài đánh giá năng lực, tư duy logic.",
    icon: <Star className="w-6 h-6 text-orange-500" />,
    highlight: "HSA · APT",
    to: "/courses",
  },
  {
    id: "p-2",
    title: "Lớp 12 - Luyện thi ĐH",
    description: "Lộ trình chuyên sâu, tổng ôn trọng tâm cho kỳ thi ĐH/THPT quốc gia.",
    icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    highlight: "Toán · Lý · Hóa",
    to: "/courses",
  },
  {
    id: "p-3",
    title: "Luyện thi THCS",
    description: "Nền tảng vững chắc cho học sinh bước vào các lớp chuyên, tuyển sinh.",
    icon: <User className="w-6 h-6 text-green-600" />,
    highlight: "Tiểu hóa lộ trình",
    to: "/courses",
  },
  {
    id: "p-4",
    title: "Luyện thi 10 - 11",
    description: "Tăng tốc kiến thức, bài tập chọn lọc, ôn thi chuyển cấp & học bù.",
    icon: <CalendarDays className="w-6 h-6 text-indigo-600" />,
    highlight: "Tốc độ học tập",
    to: "/courses",
  },
  {
    id: "p-5",
    title: "Sách & Tài liệu",
    description: "Tuyển chọn đầu sách luyện thi, đề luyện và tài liệu tham khảo chất lượng.",
    icon: <FileText className="w-6 h-6 text-rose-600" />,
    highlight: "Tải ngay",
    to: "/courses",
  },
  {
    id: "p-6",
    title: "Khóa học online",
    description: "Kho bài giảng on-demand, luyện tập và hệ thống bài tập tự chấm.",
    icon: <Globe className="w-6 h-6 text-sky-600" />,
    highlight: "VOD · Livestream",
    to: "/courses",
  },
];

const ProgramsSection: React.FC = () => {
  return (
    <section aria-label="Các chương trình học tại SSStudy" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Các chương trình học tại SSStudy</h2>
          <Link to="/courses" className="hidden sm:inline-block">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2">
              Xem tất cả khóa học
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map((p) => (
            <Card key={p.id} className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50">
                  {p.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">{p.title}</h3>
                    {p.highlight && <span className="text-xs text-gray-500">{p.highlight}</span>}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{p.description}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <Link to={p.to ?? "/courses"}>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-3 py-1 text-sm">
                        Khám phá
                      </Button>
                    </Link>
                    <Link to={p.to ?? "/courses"} className="text-sm text-gray-500 hover:text-gray-700">
                      Xem chi tiết →
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 sm:hidden text-center">
          <Link to="/courses">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3">
              Xem tất cả khóa học
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Star, Users } from "lucide-react";

const StatItem: React.FC<{ value: React.ReactNode; label: string }> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-start">
      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
};

const AboutHero: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
          {/* Left: Text Content */}
          <div className="lg:col-span-7">
            <div className="max-w-2xl">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm mb-4">
                VỀ CHÚNG TÔI
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
                Hệ sinh thái giáo dục thực chiến — Đồng hành cùng học sinh trên con đường chinh phục mục tiêu
              </h1>

              <p className="text-base sm:text-lg text-gray-600 mb-6">
                SSStudy cung cấp lộ trình rõ ràng, tài liệu chuyên sâu và đội ngũ giảng viên kinh nghiệm để giúp học viên
                chuẩn bị tốt nhất cho các kỳ thi quan trọng. Chúng tôi kết hợp phương pháp tư duy, luyện đề và ôn luyện có hệ thống.
              </p>

              <div className="flex flex-wrap gap-3 items-center mb-8">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 shadow-md">
                  Tìm hiểu khoá học
                </Button>
                <Button variant="outline" className="rounded-full px-6 py-3">
                  Liên hệ tư vấn
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-3">
                <StatItem value={<><strong>186k+</strong></>} label="Học viên" />
                <StatItem value={<><strong>10 năm</strong></>} label="Kinh nghiệm luyện thi" />
                <StatItem value={<><strong>454+</strong></>} label="Thủ khoa, Á khoa" />
              </div>
            </div>
          </div>

          {/* Right: Image + badges */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px]">
              <div className="absolute -right-8 -top-8 w-72 h-72 rounded-full bg-blue-100 opacity-90 hidden lg:block" />
              <Card className="relative z-10 p-0 overflow-hidden shadow-xl rounded-xl">
                <div className="w-full h-80 bg-gray-100">
                  <img
                    src="/images/anh-giao-vien.png"
                    alt="Giảng viên SSStudy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>

              {/* Top-left small badge */}
              <div className="absolute left-0 -top-3 bg-white rounded-xl px-3 py-2 shadow-md flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                  <BookOpen size={16} />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Courses</div>
                  <div className="text-sm font-semibold">1200+</div>
                </div>
              </div>

              {/* Bottom-right rating badge */}
              <div className="absolute right-0 -bottom-3 bg-white rounded-xl px-3 py-2 shadow-md flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <Star size={14} />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Rating</div>
                  <div className="text-sm font-semibold">4.8 (2.3k)</div>
                </div>
              </div>

              {/* Floating people count */}
              <div className="absolute left-4 bottom-8 bg-white rounded-full px-3 py-1 shadow-sm flex items-center text-sm space-x-2">
                <Users size={16} className="text-gray-600" />
                <span className="text-gray-700 font-medium">2358 học viên</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
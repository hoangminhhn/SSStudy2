"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, BookOpen, Star } from "lucide-react";

const AboutHero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
          {/* Left content */}
          <div className="lg:col-span-7">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-3">SSSTUDY.VN</div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                Thương hiệu giáo dục
                <br />
                <span className="text-slate-900">Luyện Thi </span>
                <span className="text-orange-600">Thực Chiến</span>
              </h1>
              <p className="mt-4 text-slate-600 text-base sm:text-lg">
                Sứ mệnh của chúng tôi là đồng hành cùng thế hệ trẻ, dẫn dắt họ đến thành công và góp phần xây dựng một tương lai tốt đẹp hơn.
              </p>

              <div className="mt-8 flex items-center space-x-4">
                <Link to="/about">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-3 shadow-lg">
                    Tìm hiểu ngay
                  </Button>
                </Link>

                <button
                  type="button"
                  aria-label="Xem livestream"
                  className="flex items-center space-x-3 text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  <span className="w-10 h-10 rounded-full border border-blue-200 flex items-center justify-center bg-white shadow">
                    <Play size={16} />
                  </span>
                  <span className="text-sm font-medium">Xem livestream</span>
                </button>
              </div>

              {/* Small stats badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                    <BookOpen size={16} />
                  </div>
                  <div className="text-sm">
                    <div className="text-xs text-slate-500">Courses</div>
                    <div className="text-sm font-semibold">1200+</div>
                  </div>
                </div>

                <div className="inline-flex items-center gap-3 bg-white rounded-lg px-4 py-2 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <Star size={14} />
                  </div>
                  <div className="text-sm">
                    <div className="text-xs text-slate-500">Skilled Growth</div>
                    <div className="text-sm font-semibold">4.8 (2356)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right image / hero */}
          <div className="lg:col-span-5 flex justify-end">
            <div className="relative w-full max-w-[340px]">
              {/* circular background */}
              <div className="absolute -right-6 -top-6 w-[320px] h-[320px] rounded-full bg-blue-100 opacity-90 hidden lg:block" />

              {/* main image */}
              <div className="relative z-10">
                <img
                  src="/images/anh-giao-vien.png"
                  alt="Anh giáo viên"
                  className="w-full h-auto rounded-xl object-cover shadow-2xl"
                />
              </div>

              {/* Badge: courses */}
              <div className="absolute left-3 bottom-6 bg-white rounded-xl px-3 py-2 shadow-md flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                  <BookOpen size={16} />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Courses</div>
                  <div className="text-sm font-semibold">1200+</div>
                </div>
              </div>

              {/* Badge: rating */}
              <div className="absolute right-3 top-8 bg-white rounded-xl px-3 py-2 shadow-md flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                  <Star size={14} />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Skilled Growth</div>
                  <div className="text-sm font-semibold">4.8 (2356)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </section>
  );
};

export default AboutHero;
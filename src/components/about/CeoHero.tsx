"use client";

import React from "react";
import { GraduationCap, Award, Clock, Star } from "lucide-react";

const CeoHero: React.FC = () => {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left column: title, intro, bullets */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
              CEO Nguyễn Tiến Đạt
            </h1>

            <p className="mt-4 text-gray-600 max-w-2xl">
              Chúng tôi hoạt động trong lĩnh vực giáo dục đào tạo, tập trung vào việc ứng dụng
              công nghệ và phương pháp giảng dạy hiện đại nhất cho thế hệ trẻ Việt Nam, cung
              cấp các chương trình học trực tuyến và trực tiếp.
            </p>

            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-800 font-semibold">
                    Cử nhân Toán Kinh tế - Đại học KTQD • Giải Ba Toán cấp cụm Hà Nội
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Award size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-800 font-semibold">
                    Giải Nhì Hóa học cấp quận Hà Nội • Khuyến khích Olympic Vật lý
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-yellow-50 text-yellow-600 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-800 font-semibold">
                    8 năm kinh nghiệm luyện thi • Hỗ trợ nhiều học sinh đạt điểm cao
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-md bg-pink-50 text-pink-600 flex items-center justify-center flex-shrink-0">
                  <Star size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-800 font-semibold">
                    85% học sinh đạt 9+ toán • Hàng nghìn học sinh đạt kết quả tốt mỗi năm
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right column: image with blue rounded background */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 p-6">
              <img
                src="/images/anh-giang-vien.png"
                alt="CEO Nguyễn Tiến Đạt"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeoHero;
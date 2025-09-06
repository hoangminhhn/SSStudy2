"use client";

import React from "react";
import { ShieldCheck, Medal, CheckCircle, Box, Star } from "lucide-react";

/**
 * AboutHero
 * - Left: title, description, two testimonial avatars with star ratings
 * - Right: vertical list of feature cards (Tin tưởng, Uy tín, Chất lượng, Hoàn chỉnh)
 *
 * This component is fully self-contained and styled with Tailwind so edits here won't affect other sections.
 */
const FeatureItem: React.FC<{ title: string; desc: string; icon: React.ReactNode }> = ({ title, desc, icon }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-lg bg-white/90 flex items-center justify-center shadow-sm">
          {icon}
        </div>
      </div>
      <div>
        <div className="font-semibold text-gray-800">{title}</div>
        <div className="text-sm text-gray-500 mt-1">{desc}</div>
      </div>
    </div>
  );
};

const Testimonial: React.FC<{ name: string; place: string }> = ({ name, place }) => {
  return (
    <div className="flex items-center space-x-3 bg-white/60 rounded-full px-4 py-2 shadow-sm">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {/* Placeholder avatar: you can replace the src with real images later */}
        <img src="/images/anh-giang-vien.png" alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="text-sm">
        <div className="font-medium text-gray-800">{name}</div>
        <div className="text-xs text-gray-500">{place}</div>
        <div className="flex items-center mt-1 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} className={i < 5 ? "text-yellow-400" : "text-gray-200"} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutHero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50/70 to-white p-8 rounded-xl shadow-sm">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left column */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
              Công ty cổ phần và đào tạo phát triển giáo dục SSStudy
            </h1>

            <p className="text-gray-700 mb-6 max-w-2xl">
              Chúng tôi hoạt động trong lĩnh vực giáo dục đào tạo, tập trung vào việc ứng dụng công nghệ và phương pháp giảng dạy hiện đại nhất cho thế hệ trẻ Việt Nam, cung cấp các chương trình học trực tuyến và trực tiếp.
            </p>

            <p className="text-gray-700 mb-6 max-w-2xl">
              Với mục tiêu phát triển tư duy sáng tạo, chúng tôi luôn cải tiến để mang lại giá trị thiết thực, giúp học sinh tự tin trong học tập và phát triển kỹ năng sống, hướng tới trở thành công dân toàn cầu.
            </p>

            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 mt-2">
              <Testimonial name="Nguyễn Tuấn Anh" place="THPT Quốc Oai, Hà Nội" />
              <Testimonial name="Nguyễn Tuấn Anh" place="THPT Quốc Oai, Hà Nội" />
            </div>
          </div>

          {/* Right column: features */}
          <div className="space-y-4">
            <div className="bg-white/90 rounded-lg p-4 shadow-sm">
              <FeatureItem
                title="Tin tưởng"
                desc="Thương hiệu giáo dục được hàng triệu học sinh Việt Nam lựa chọn"
                icon={<ShieldCheck size={20} className="text-blue-600" />}
              />
            </div>

            <div className="bg-white/90 rounded-lg p-4 shadow-sm">
              <FeatureItem
                title="Uy tín"
                desc="Đội ngũ giáo viên đứng top đầu Việt Nam về chất lượng và uy tín"
                icon={<Medal size={20} className="text-orange-500" />}
              />
            </div>

            <div className="bg-white/90 rounded-lg p-4 shadow-sm">
              <FeatureItem
                title="Chất lượng"
                desc="Cam kết 100% học sinh đỗ đại học (chính sách tùy chương trình)"
                icon={<CheckCircle size={20} className="text-green-500" />}
              />
            </div>

            <div className="bg-white/90 rounded-lg p-4 shadow-sm">
              <FeatureItem
                title="Hoàn chỉnh"
                desc="Thương hiệu giáo dục được học sinh Việt Nam lựa chọn"
                icon={<Box size={20} className="text-violet-500" />}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
"use client";

import React from "react";
import { Star, ShieldCheck, ClipboardCheck, Users, ThumbUp } from "lucide-react";

const FeatureItem: React.FC<{ title: string; desc: string; Icon: React.ComponentType<any> }> = ({
  title,
  desc,
  Icon,
}) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
        <Icon className="text-blue-600" size={20} />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
        <p className="text-xs text-slate-500 mt-1">{desc}</p>
      </div>
    </div>
  );
};

const Testimonial: React.FC<{ name: string; place: string }> = ({ name, place }) => {
  return (
    <div className="flex items-center space-x-3">
      <img
        src="/images/anh-giao-vien.png"
        alt={name}
        className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
      />
      <div>
        <div className="text-sm font-semibold text-slate-800">{name}</div>
        <div className="text-xs text-slate-500">{place}</div>
        <div className="flex items-center mt-1 space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} className="text-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutHeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="bg-[linear-gradient(90deg,rgba(255,255,255,0.8),rgba(255,255,255,0.95))] rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left content */}
            <div className="lg:col-span-7">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                Công ty cổ phần và đào tạo phát triển giáo dục SSStudy
              </h1>

              <div className="mt-4 text-slate-700 space-y-4">
                <p>
                  Chúng tôi hoạt động trong lĩnh vực giáo dục đào tạo, tập trung vào việc ứng dụng công nghệ và phương pháp giảng dạy hiện đại nhất cho thế hệ trẻ Việt Nam, cung cấp các chương trình học trực tuyến và trực tiếp.
                </p>

                <p>
                  Với mục tiêu phát triển tư duy sáng tạo, chúng tôi không ngừng cải tiến để mang lại giá trị tri thức, giúp học sinh tự tin trong học tập và phát triển kỹ năng sống, hướng tới trở thành công dân toàn cầu. Sứ mệnh của chúng tôi là đồng hành cùng thế hệ trẻ, dẫn dắt họ đến thành công và góp phần xây dựng một tương lai tốt đẹp hơn.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-6 sm:space-y-0">
                <Testimonial name="Nguyễn Tuấn Anh" place="THPT Quốc Oai, Hà Nội" />
                <Testimonial name="Nguyễn Tuấn Anh" place="THPT Quốc Oai, Hà Nội" />
              </div>
            </div>

            {/* Right features */}
            <aside className="lg:col-span-5">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <FeatureItem
                    Icon={Users}
                    title="Tin tưởng"
                    desc="Thương hiệu giáo dục được hàng triệu học sinh Việt Nam lựa chọn"
                  />
                </div>

                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <FeatureItem
                    Icon={ShieldCheck}
                    title="Uy tín"
                    desc="Đội ngũ giáo viên đứng top đầu Việt Nam về chất lượng và uy tín"
                  />
                </div>

                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <FeatureItem
                    Icon={ClipboardCheck}
                    title="Chất lượng"
                    desc="Cam kết 100% học sinh đỗ đại học (chính sách cam kết)"
                  />
                </div>

                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <FeatureItem
                    Icon={ThumbUp}
                    title="Hoàn chỉnh"
                    desc="Thương hiệu giáo dục được hàng triệu học sinh Việt Nam lựa chọn"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
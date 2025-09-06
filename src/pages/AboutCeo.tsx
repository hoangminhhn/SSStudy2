"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import CeoHero from "@/components/about/CeoHero";

const AboutCeo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Giới thiệu" />
      <main className="flex-grow container mx-auto px-4 py-8 space-y-8">
        {/* New CEO hero section */}
        <CeoHero />

        {/* Additional details (kept below hero) */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <p className="text-gray-700 mb-4">
            Nguyễn Tiến Đạt là người sáng lập và CEO của SSStudy, với nhiều năm kinh nghiệm trong lĩnh vực giáo dục và đào tạo, dẫn dắt đội ngũ xây dựng các chương trình luyện thi thực chiến.
          </p>
          <p className="text-gray-700">
            Ông tập trung vào việc phát triển phương pháp giảng dạy giúp học sinh tư duy và áp dụng kiến thức hiệu quả trong kỳ thi.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutCeo;
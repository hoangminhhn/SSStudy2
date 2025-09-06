"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";

const AboutCeo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Giới thiệu" />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">CEO: Nguyễn Tiến Đạt</h1>
        <p className="text-gray-700 mb-4">
          Nguyễn Tiến Đạt là người sáng lập và CEO của SSStudy, với nhiều năm kinh nghiệm trong lĩnh vực giáo dục và đào tạo, dẫn dắt đội ngũ xây dựng các chương trình luyện thi thực chiến.
        </p>
        <p className="text-gray-700">
          Ông tập trung vào việc phát triển phương pháp giảng dạy giúp học sinh tư duy và áp dụng kiến thức hiệu quả trong kỳ thi.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default AboutCeo;
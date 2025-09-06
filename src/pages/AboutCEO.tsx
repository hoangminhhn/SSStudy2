"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const AboutCEO: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">CEO — Nguyễn Tiến Đạt</h1>
        <p className="text-gray-700">
          Nguyễn Tiến Đạt là người sáng lập và điều hành SSStudy, với nhiều năm kinh nghiệm trong lĩnh vực giáo dục và luyện thi.
        </p>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Tiểu sử ngắn</h2>
          <p className="text-gray-700">
            Thầy Đạt đã dẫn dắt nhiều khóa học đạt kết quả cao và là người truyền cảm hứng cho đội ngũ giảng viên tại SSStudy.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutCEO;
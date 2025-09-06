"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Về chúng tôi</h1>
        <p className="text-gray-700">
          Chúng tôi là SSStudy — nền tảng giáo dục tập trung cung cấp các khóa học luyện thi, tài liệu và cộng đồng hỗ trợ học tập cho học sinh.
        </p>
        <section className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Sứ mệnh</h2>
          <p className="text-gray-700">Đồng hành cùng thế hệ trẻ, giúp hình thành tư duy và đạt kết quả cao trong học tập.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
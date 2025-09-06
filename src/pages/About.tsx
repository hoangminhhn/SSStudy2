"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Giới thiệu" />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Về chúng tôi</h1>
        <p className="text-gray-700 mb-4">
          SSStudy là nền tảng giáo dục trực tuyến cung cấp các khóa học luyện thi chất lượng cao, đội ngũ giảng viên giàu kinh nghiệm và tài liệu học tập được biên soạn bài bản.
        </p>
        <p className="text-gray-700">
          Chúng tôi cam kết đồng hành cùng học viên trên con đường chinh phục mục tiêu học tập thông qua phương pháp giảng dạy thực chiến và lộ trình rõ ràng.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default About;
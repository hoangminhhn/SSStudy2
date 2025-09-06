"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import AboutHero from "@/components/about/AboutHero";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Giới thiệu" />
      <main className="flex-grow">
        <AboutHero />
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-4">Sứ mệnh & Tầm nhìn</h2>
          <p className="text-gray-700 mb-4">
            SSStudy mong muốn trở thành hệ sinh thái giáo dục hàng đầu, giúp thế hệ trẻ đạt được kết quả cao nhất thông qua phương pháp giảng dạy hiệu quả và lộ trình rõ ràng.
          </p>

          {/* Additional content placeholder */}
          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Đội ngũ giảng viên</h3>
            <p className="text-gray-700">Đội ngũ giảng viên giàu kinh nghiệm, được tuyển chọn kỹ lưỡng và liên tục cập nhật chương trình giảng dạy.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
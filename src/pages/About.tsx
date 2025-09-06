"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import AboutHeroSection from "@/components/home/AboutHeroSection";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Giới thiệu" />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* New hero section */}
        <AboutHeroSection />

        {/* below hero: keep existing descriptive content as before (optional) */}
        <section className="mt-10 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">Sứ mệnh</h2>
          <p className="text-slate-700">
            Chúng tôi cam kết đồng hành cùng học viên trên con đường chinh phục mục tiêu học tập thông qua phương pháp giảng dạy thực chiến và lộ trình rõ ràng.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
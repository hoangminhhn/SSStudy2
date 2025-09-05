"use client";

import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import HeroSlider from "@/components/home/HeroSlider";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSlider />

        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Chào mừng đến với SSStudy!</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Nền tảng học tập trực tuyến hàng đầu, cung cấp các khóa học chất lượng cao giúp bạn đạt được mục tiêu học tập.
            </p>
            <div className="space-x-4">
              <Link to="/courses">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-4 text-lg font-semibold">
                  Khám phá Khóa học
                </Button>
              </Link>
              <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full px-8 py-4 text-lg font-semibold">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
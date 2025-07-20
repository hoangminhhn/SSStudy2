"use client";

import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-8 py-12 flex flex-col items-center justify-center text-center"> {/* Changed px-4 to px-8 */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Chào mừng đến với SSStudy!</h1>
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
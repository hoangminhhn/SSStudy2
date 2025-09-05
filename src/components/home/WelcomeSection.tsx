"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const WelcomeSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Chào mừng đến với SSStudy!</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Nền tảng học tập trực tuyến hàng đầu, cung cấp các khóa học chất lượng cao giúp bạn đạt được mục tiêu học tập.
        </p>
        <div className="space-x-4">
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full px-8 py-4 text-lg font-semibold">
            Tìm hiểu thêm
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
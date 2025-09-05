"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const WelcomeSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Chào mừng tới SSSTUDY</h2>
            <p className="text-slate-600 mb-6">
              Nền tảng luyện thi hàng đầu với nội dung thực chiến, giảng viên có kinh nghiệm và cộng đồng hỗ trợ.
            </p>

            <div className="flex items-center space-x-4">
              <Link to="/courses">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-4 text-lg font-semibold">
                  Khám phá
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <img src="/images/welcome-illustration.png" alt="Welcome" className="w-full h-auto rounded-lg shadow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
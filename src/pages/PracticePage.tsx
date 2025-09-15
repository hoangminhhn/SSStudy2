"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import ExamFilters from "@/components/exam/ExamFilters";
import ExamList from "@/components/exam/ExamList";

const PracticePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav courseTitle="Thi thử" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <ExamFilters />
          </div>

          <div className="lg:col-span-9">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-800">Danh sách đề thi</h1>
              <p className="text-sm text-gray-500">Chọn đề phù hợp để luyện tập, làm quen cấu trúc đề và kiểm tra năng lực.</p>
            </div>

            <div className="mt-6">
              <ExamList />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PracticePage;
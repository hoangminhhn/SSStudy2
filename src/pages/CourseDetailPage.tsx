"use client";

import React from "react";
import Header from "@/components/layout/Header";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import CourseHero from "@/components/course/CourseHero";
import CourseContent from "@/components/course/CourseContent";
import CourseReview from "@/components/course/CourseReview";
import Footer from "@/components/layout/Footer";
import UpcomingLiveButton from "@/components/common/UpcomingLiveButton"; // Import the new button
import { chapters } from "@/data/courseData"; // Import chapters data

const CourseDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav />
      <main className="flex-grow container mx-auto px-4 py-8">
        <CourseHero />
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-orange-600">BÀI HỌC</h2>
            <UpcomingLiveButton chaptersData={chapters} />
          </div>
          <p className="text-gray-700 mb-6">
            Tổng hợp khóa học chuyên đề gồm 16 chương nhằm lấy lại kiến thức cho các bạn bị mất căn bản và chuẩn bị luyện thi vào đại học
          </p>
          <CourseContent />
        </div>
        <CourseReview />
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetailPage;
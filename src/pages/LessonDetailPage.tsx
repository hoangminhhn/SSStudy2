"use client";

import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import LessonHero from "@/components/lesson/LessonHero";
import CourseContent from "@/components/course/CourseContent"; // Reusing CourseContent for the sidebar
import Footer from "@/components/layout/Footer";

const LessonDetailPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  // Dummy data for the lesson based on lessonId
  // In a real app, you would fetch this data from an API
  const lessonData = {
    "buoi-1-tong-on-luong-giac-phan-1": {
      title: "Buổi 1: Tổng ôn lượng giác (phần 1)",
      teacher: "Thầy Nguyễn Tiến Đạt",
      views: 19,
      courseTitle: "[2K8 - SSLIVE] S1: Chuyên đề - Toán học 12",
    },
    // Add more dummy data for other lessons as needed
  }[lessonId || ""]; // Default to empty string if lessonId is undefined

  if (!lessonData) {
    // Handle case where lessonId is not found
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">Bài học không tìm thấy.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <BreadcrumbNav
        courseTitle={lessonData.courseTitle}
        lessonTitle={lessonData.title}
      />
      <main className="flex-grow container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <LessonHero
            lessonTitle={lessonData.title}
            teacherName={lessonData.teacher}
            viewsRemaining={lessonData.views}
          />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">BÀI HỌC</h2>
            <p className="text-gray-700 mb-6">
              Tổng hợp khóa học chuyên đề gồm 16 chương nhằm lấy lại kiến thức cho các bạn bị mất căn bản và chuẩn bị luyện thi vào đại học
            </p>
            <CourseContent isSidebar={true} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LessonDetailPage;
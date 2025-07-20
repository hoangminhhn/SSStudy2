"use client";

import React from "react";
import { useParams, Link } from "react-router-dom"; // Import Link
import Header from "@/components/layout/Header";
import BreadcrumbNav from "@/components/layout/BreadcrumbNav";
import LessonHero from "@/components/lesson/LessonHero";
import CourseContent from "@/components/course/CourseContent"; // Reusing CourseContent for the sidebar
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button"; // Import Button
import { chapters, Session } from "@/data/courseData"; // Import chapters and Session type

// Flatten all sessions into a single object for easy lookup
const lessonData: { [key: string]: { title: string; teacher: string; views: number; courseTitle: string } } = {};
chapters.forEach(chapter => {
  chapter.sessions.forEach(session => {
    lessonData[session.sessionId] = {
      title: session.title,
      teacher: session.teacher,
      views: session.views,
      courseTitle: chapter.title, // Use chapter title as course title for breadcrumb
    };
  });
});

const LessonDetailPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  const currentLessonData = lessonData[lessonId || ""];

  if (!currentLessonData) {
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
        courseTitle={currentLessonData.courseTitle}
        lessonTitle={currentLessonData.title}
      />
      <main className="flex-grow container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1">
          <div className="mb-6">
            <Link to={`/lesson-v2/${lessonId}`}>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-3">
                Xem phiên bản bài học mới (V2)
              </Button>
            </Link>
          </div>
          <LessonHero
            lessonTitle={currentLessonData.title}
            teacherName={currentLessonData.teacher}
            viewsRemaining={currentLessonData.views}
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
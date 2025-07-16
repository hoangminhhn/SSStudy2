"use client";

import React from "react";
import { useParams } from "react-router-dom";
import LessonHeader from "@/components/layout/LessonHeader";
import LessonVideoPlayer from "@/components/lesson/LessonVideoPlayer";
import LessonNavigation from "@/components/lesson/LessonNavigation";
import CourseContent from "@/components/course/CourseContent"; // Reusing CourseContent for the sidebar
import FloatingAskQuestionButton from "@/components/lesson/FloatingAskQuestionButton"; // Import the new floating button

// Dummy data for lessons, derived from CourseContent's chapters for consistency
const allChaptersData = [
  {
    id: "chapter-1",
    progress: "0/8",
    title: "Tổng ôn kiến thức lớp 11 phần Đại số",
    sessions: [
      {
        sessionId: "buoi-1-tong-on-luong-giac-phan-1",
        title: "Buổi 1: Tổng ôn lượng giác (phần 1)",
        teacher: "Thầy Nguyễn Tiến Đạt",
        views: 19,
      },
      {
        sessionId: "buoi-2-tong-on-luong-giac-phan-2",
        title: "Buổi 2: Tổng ôn lượng giác (phần 2)",
        teacher: "Thầy Nguyễn Tiến Đạt",
        views: 15,
      },
      { sessionId: "buoi-3-tong-on-csc-csn", title: "Buổi 3: Tổng ôn CSC – CSN", teacher: "Thầy Nguyễn Tiến Đạt", views: 10 },
      { sessionId: "buoi-4-tong-on-ham-so-mu-loga", title: "Buổi 4: Tổng ôn hàm số mũ loga", teacher: "Thầy Nguyễn Tiến Đạt", views: 12 },
      { sessionId: "buoi-5-tong-on-pt-bpt-mu-loga", title: "Buổi 5: Tổng ôn PT, BPT mũ loga", teacher: "Thầy Nguyễn Tiến Đạt", views: 8 },
      { sessionId: "buoi-6-tong-on-bai-toan-tang-truong-lai-suat", title: "Buổi 6: Tổng ôn bài toán tăng trưởng, lãi suất", teacher: "Thầy Nguyễn Tiến Đạt", views: 7 },
      { sessionId: "buoi-7-tong-on-gioi-han", title: "Buổi 7: Tổng ôn giới hạn", teacher: "Thầy Nguyễn Tiến Đạt", views: 11 },
      { sessionId: "buoi-8-tong-on-phuong-trinh-tiep-tuyen-dao-ham", title: "Buổi 8: Tổng ôn phương trình tiếp tuyến & đạo hàm", teacher: "Thầy Nguyễn Tiến Đạt", views: 9 },
    ],
  },
  {
    id: "chapter-2",
    progress: "0/9",
    title: "Tổng ôn kiến thức lớp 11 phần Hình học",
    sessions: [
      {
        sessionId: "buoi-1-gioi-thieu-hinh-hoc",
        title: "Buổi 1: Giới thiệu hình học",
        teacher: "Cô Trần Thị B",
        views: 22,
      },
      { sessionId: "buoi-2-cac-dang-bai-tap", title: "Buổi 2: Các dạng bài tập", teacher: "Cô Trần Thị B", views: 18 },
    ],
  },
  {
    id: "chapter-3",
    progress: "0/43",
    title: "[Classin] Chương 1: Hàm số",
    sessions: [
      {
        sessionId: "buoi-1-khai-niem-ham-so",
        title: "Buổi 1: Khái niệm hàm số",
        teacher: "Thầy Nguyễn Tiến Đạt",
        views: 10,
      },
      { sessionId: "buoi-2-do-thi-ham-so", title: "Buổi 2: Đồ thị hàm số", teacher: "Thầy Nguyễn Tiến Đạt", views: 14 },
    ],
  },
  {
    id: "chapter-4",
    progress: "0/1",
    title: "[Classin] Chương 2: Mẫu số liệu ghép nhóm",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-mau-so-lieu", title: "Buổi 1: Giới thiệu", teacher: "Thầy Nguyễn Tiến Đạt", views: 5 },
    ],
  },
  {
    id: "chapter-5",
    progress: "0/20",
    title: "[Classin] Chương 3: Nguyên hàm tích phân",
    sessions: [
      { sessionId: "buoi-1-nguyen-ham-co-ban", title: "Buổi 1: Nguyên hàm cơ bản", teacher: "Thầy Nguyễn Tiến Đạt", views: 16 },
    ],
  },
  {
    id: "chapter-6",
    progress: "0/12",
    title: "[Classin] Chương 4: Xác suất có điều kiện",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-xac-suat", title: "Buổi 1: Giới thiệu", teacher: "Thầy Nguyễn Tiến Đạt", views: 9 },
    ],
  },
  {
    id: "chapter-7",
    progress: "0/32",
    title: "[Classin] Chương 5: Oxyz",
    sessions: [
      { sessionId: "buoi-1-he-toa-do-oxyz", title: "Buổi 1: Hệ tọa độ Oxyz", teacher: "Thầy Nguyễn Tiến Đạt", views: 25 },
    ],
  },
  {
    id: "chapter-8",
    progress: "0/4",
    title: "[Classin] Ôn tập giữa kì 1",
    sessions: [
      { sessionId: "buoi-1-tong-on-giua-ki-1", title: "Buổi 1: Tổng ôn", teacher: "Thầy Nguyễn Tiến Đạt", views: 6 },
    ],
  },
  {
    id: "chapter-9",
    progress: "0/6",
    title: "[Classin] Ôn tập học kì 1",
    sessions: [
      { sessionId: "buoi-1-tong-on-hoc-ki-1", title: "Buổi 1: Tổng ôn", teacher: "Thầy Nguyễn Tiến Đạt", views: 7 },
    ],
  },
  {
    id: "chapter-10",
    progress: "0/4",
    title: "[Classin] Ôn tập giữa kì 2",
    sessions: [
      { sessionId: "buoi-1-tong-on-giua-ki-2", title: "Buổi 1: Tổng ôn", teacher: "Thầy Nguyễn Tiến Đạt", views: 5 },
    ],
  },
  {
    id: "chapter-11",
    progress: "0/6",
    title: "[Classin] Ôn tập học kì 2",
    sessions: [
      { sessionId: "buoi-1-tong-on-hoc-ki-2", title: "Buổi 1: Tổng ôn", teacher: "Thầy Nguyễn Tiến Đạt", views: 8 },
    ],
  },
  {
    id: "chapter-12",
    progress: "0/45",
    title: "[SSVOD] Chương 1: Hàm số",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-ham-so", title: "Buổi 1: Giới thiệu", teacher: "Thầy Nguyễn Tiến Đạt", views: 30 },
    ],
  },
  {
    id: "chapter-13",
    progress: "0/2",
    title: "[SSVOD] Chương 2: Mẫu số liệu ghép nhóm",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-mau-so-lieu", title: "Buổi 1: Giới thiệu", teacher: "Thầy Nguyễn Tiến Đạt", views: 4 },
    ],
  },
  {
    id: "chapter-14",
    progress: "0/24",
    title: "[SSVOD] Chương 3: Nguyên hàm tích phân",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-nguyen-ham", title: "Buổi 1: Giới thiệu", teacher: "Thầy Nguyễn Tiến Đạt", views: 20 },
    ],
  },
  {
    id: "chapter-15",
    progress: "0/12",
    title: "[SSVOD] Chương 4: Xác suất có điều kiện",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-xac-suat", title: "Buổi 1: Giới thiệu", teacher: "Thầy Nguyễn Tiến Đạt", views: 10 },
    ],
  },
  {
    id: "chapter-16",
    progress: "0/26",
    title: "[SSVOD] Chương 5: Oxyz",
    sessions: [
      { sessionId: "buoi-1-gioi-thieu-ssvod-oxyz", title: "Buổi 1: Giới thiệu", teacher: "Thầy Nguyễn Tiến Đạt", views: 22 },
    ],
  },
];

// Flatten all sessions into a single array for easy lookup and navigation
const allLessons = allChaptersData.flatMap(chapter =>
  chapter.sessions.map(session => ({
    ...session,
    courseTitle: chapter.title,
  }))
);

const LessonDetailPageV2 = () => {
  const { lessonId } = useParams<{ lessonId: string }>();

  const currentLessonIndex = allLessons.findIndex(lesson => lesson.sessionId === lessonId);
  const currentLesson = allLessons[currentLessonIndex];

  if (!currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">Bài học không tìm thấy.</p>
      </div>
    );
  }

  const prevLessonId = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1].sessionId : undefined;
  const nextLessonId = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1].sessionId : undefined;

  const totalLessons = allLessons.length;
  const progressValue = Math.round(((currentLessonIndex + 1) / totalLessons) * 100);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <LessonHeader
        courseTitle={`${currentLesson.courseTitle} (Trang chi tiết bài học v2)`}
        progressValue={progressValue}
        currentLessonCount={currentLessonIndex + 1}
        totalLessonCount={totalLessons}
      />
      {/* Main content area: takes all available vertical space, is a flex row */}
      <div className="flex-grow flex lg:flex-row overflow-hidden">
        {/* Left Column: Video Player + Community Links + Floating Ask Question Button */}
        {/* Added overflow-y-auto to this div to enable sticky positioning within it */}
        <div className="flex flex-col lg:w-2/3 bg-white overflow-y-auto h-full relative">
          <div className="p-6 flex-grow">
            <LessonVideoPlayer
              lessonTitle={currentLesson.title}
              updatedDate="tháng 11 năm 2022" // Placeholder for now
              onAddNote={() => console.log("Add note clicked from LessonVideoPlayer")}
            />

            {/* Removed Community links section */}
          </div>

          {/* Removed "Made with Dyad" text at the bottom of the scrollable content */}
          {/* Floating "Hỏi đáp" button, positioned sticky within the left column */}
          <FloatingAskQuestionButton onClick={() => console.log("Ask question clicked")} />
        </div>

        {/* Right Column: Course Content Sidebar */}
        <div className="lg:w-1/3 bg-white border-l border-gray-200 p-6 overflow-y-auto h-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Nội dung khóa học</h2>
          <CourseContent isSidebar={true} />
        </div>
      </div>
      <LessonNavigation
        prevLessonId={prevLessonId}
        nextLessonId={nextLessonId}
      />
    </div>
  );
};

export default LessonDetailPageV2;
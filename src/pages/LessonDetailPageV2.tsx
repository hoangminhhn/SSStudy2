"use client";

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LessonHeader from "@/components/layout/LessonHeader";
import LessonVideoPlayer from "@/components/lesson/LessonVideoPlayer";
import LessonNavigation from "@/components/lesson/LessonNavigation";
import CourseContent from "@/components/course/CourseContent";
import FloatingAskQuestionButton from "@/components/lesson/FloatingAskQuestionButton";
import { Button } from "@/components/ui/button";
import { Download, Edit, AlertTriangle } from "lucide-react";
import GuidedTourOverlay from "@/components/tour/GuidedTourOverlay";
import NotesSidebar from "@/components/lesson/NotesSidebar"; // Import the new NotesSidebar

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentTourStepIndex, setCurrentTourStepIndex] = useState(0);
  const [isNotesSidebarOpen, setIsNotesSidebarOpen] = useState(false); // New state for notes sidebar

  // Define tour steps (unchanged)
  const tourSteps = [
    {
      selector: '#tour-video-player',
      title: 'Khu vực video bài học',
      description: 'Đây là nơi bạn sẽ xem các bài giảng video. Bạn có thể điều khiển phát/tạm dừng, tua nhanh/chậm tại đây.',
      position: 'bottom',
    },
    {
      selector: '#tour-add-note-button',
      title: 'Thêm ghi chú',
      description: 'Nhấn vào đây để thêm ghi chú tại thời điểm hiện tại của video. Ghi chú sẽ giúp bạn ôn tập hiệu quả hơn.',
      position: 'bottom',
    },
    {
      selector: '#tour-download-no-ans',
      title: 'Tải đề (không đáp án)',
      description: 'Bạn có thể tải về đề bài tập mà không có đáp án để tự luyện tập.',
      position: 'bottom',
    },
    {
      selector: '#tour-do-exercise',
      title: 'Làm bài tập',
      description: 'Sau khi xem xong bài giảng, hãy nhấn vào đây để làm bài tập thực hành và củng cố kiến thức.',
      position: 'bottom',
    },
    {
      selector: '#tour-first-lesson-item',
      title: 'Nội dung khóa học',
      description: 'Đây là danh sách các chương và bài học trong khóa. Bạn có thể chọn bài học tiếp theo tại đây.',
      position: 'left', // Position relative to the sidebar item
    },
    {
      selector: '#tour-toggle-sidebar-button',
      title: 'Thu gọn/Mở rộng nội dung',
      description: 'Sử dụng nút này để thu gọn hoặc mở rộng cột nội dung khóa học, giúp bạn tập trung vào video hơn.',
      position: 'top',
    },
    {
      selector: '#tour-help-button',
      title: 'Nút Hướng dẫn',
      description: 'Bạn có thể nhấn vào nút này bất cứ lúc nào để xem lại hướng dẫn sử dụng các tính năng của trang.',
      position: 'bottom',
    },
  ];

  const startTour = () => {
    setIsTourActive(true);
    setCurrentTourStepIndex(0);
  };

  const handleNextTourStep = () => {
    if (currentTourStepIndex < tourSteps.length - 1) {
      setCurrentTourStepIndex(prev => prev + 1);
    } else {
      setIsTourActive(false); // End tour
    }
  };

  const handlePrevTourStep = () => {
    if (currentTourStepIndex > 0) {
      setCurrentTourStepIndex(prev => prev - 1);
    }
  };

  const handleCloseTour = () => {
    setIsTourActive(false);
    setCurrentTourStepIndex(0); // Reset for next time
  };

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

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <LessonHeader
        courseTitle={`${currentLesson.courseTitle} (Trang chi tiết bài học v2)`}
        progressValue={progressValue}
        currentLessonCount={currentLessonIndex + 1}
        totalLessonCount={totalLessons}
        onHelpClick={startTour}
        onNotesClick={() => setIsNotesSidebarOpen(true)} // Pass handler to open notes sidebar
      />
      <div className="flex-grow flex lg:flex-row overflow-hidden">
        <div className={`flex flex-col bg-white overflow-y-auto h-full relative ${isSidebarOpen ? 'lg:w-2/3' : 'lg:w-full'}`}>
          <div className="px-6 pt-6 pb-0">
            <LessonVideoPlayer
              rootId="tour-video-player"
              lessonTitle={currentLesson.title}
              updatedDate="tháng 11 năm 2022"
              onAddNote={(content) => console.log("Note added from LessonDetailPageV2:", content)}
              addNoteButtonId="tour-add-note-button"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-0 px-6 pb-6 pr-24">
            <Button id="tour-download-no-ans" variant="ghost" className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2">
              <Download size={16} className="mr-2" />
              Tải đề (không đáp án)
            </Button>
            <Button variant="ghost" className="text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-full px-4 py-2">
              <Download size={16} className="mr-2" />
              Tải đề (có đáp án)
            </Button>
            <Button id="tour-do-exercise" className="bg-gray-300 text-gray-700 rounded-full px-6 py-3 cursor-not-allowed" disabled>
              Làm bài tập <Edit size={16} className="ml-2" />
            </Button>
            <Button variant="outline" className="text-gray-700 border-gray-300 hover:bg-gray-100 rounded-full px-6 py-3">
              Báo lỗi <AlertTriangle size={16} className="ml-2" />
            </Button>
          </div>

          <FloatingAskQuestionButton onClick={() => console.log("Ask question clicked")} />
        </div>

        {isSidebarOpen && (
          <div className="lg:w-1/3 bg-white border-l border-gray-200 p-6 overflow-y-auto h-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Nội dung khóa học</h2>
            <CourseContent isSidebar={true} />
          </div>
        )}
      </div>
      <LessonNavigation
        prevLessonId={prevLessonId}
        nextLessonId={nextLessonId}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        toggleSidebarButtonId="tour-toggle-sidebar-button"
      />

      {isTourActive && (
        <GuidedTourOverlay
          isOpen={isTourActive}
          steps={tourSteps}
          currentStepIndex={currentTourStepIndex}
          onNext={handleNextTourStep}
          onPrev={handlePrevTourStep}
          onClose={handleCloseTour}
        />
      )}

      <NotesSidebar
        isOpen={isNotesSidebarOpen}
        onClose={() => setIsNotesSidebarOpen(false)}
      />
    </div>
  );
};

export default LessonDetailPageV2;
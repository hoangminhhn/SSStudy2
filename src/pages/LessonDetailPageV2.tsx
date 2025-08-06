"use client";

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LessonHeader from "@/components/layout/LessonHeader";
import LessonVideoPlayer from "@/components/lesson/LessonVideoPlayer";
import LessonHero from "@/components/lesson/LessonHero";
import LessonNavigation from "@/components/lesson/LessonNavigation";
import CourseContent from "@/components/course/CourseContent";
import FloatingAskQuestionButton from "@/components/lesson/FloatingAskQuestionButton";
import { Button } from "@/components/ui/button";
import { Download, Edit, AlertTriangle } from "lucide-react";
import GuidedTourOverlay from "@/components/tour/GuidedTourOverlay";
import NotesSidebar from "@/components/lesson/NotesSidebar";
import AskQuestionSidebar from "@/components/lesson/AskQuestionSidebar";
import InlineAddNotePanel from "@/components/lesson/InlineAddNotePanel";
import { chapters } from "@/data/courseData";

const allLessons = chapters.flatMap(chapter =>
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
  const [isNotesSidebarOpen, setIsNotesSidebarOpen] = useState(false);
  const [isAskQuestionSidebarOpen, setIsAskQuestionSidebarOpen] = useState(false);
  const [isAddNotePanelOpen, setIsAddNotePanelOpen] = useState(false);

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
      position: 'left',
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
      setIsTourActive(false);
    }
  };

  const handlePrevTourStep = () => {
    if (currentTourStepIndex > 0) {
      setCurrentTourStepIndex(prev => prev - 1);
    }
  };

  const handleCloseTour = () => {
    setIsTourActive(false);
    setCurrentTourStepIndex(0);
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

  const handleAddNoteSave = (content: string) => {
    console.log("Note added from LessonDetailPageV2:", content);
    setIsAddNotePanelOpen(false);
  };

  const handleAddNoteCancel = () => {
    console.log("Note creation cancelled.");
    setIsAddNotePanelOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <LessonHeader
        courseTitle={`${currentLesson.courseTitle} (Trang chi tiết bài học v2)`}
        progressValue={progressValue}
        currentLessonCount={currentLessonIndex + 1}
        totalLessonCount={totalLessons}
        onHelpClick={startTour}
        onNotesClick={() => setIsNotesSidebarOpen(true)}
      />
      <div className="flex-grow flex lg:flex-row overflow-hidden">
        <div className={`flex flex-col bg-white overflow-y-auto h-full relative ${isSidebarOpen ? 'lg:w-2/3' : 'lg:w-full'}`}>
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            <img
              src="/images/20250630150800-ugrw2nuezq.png"
              alt="Video Thumbnail"
              className="w-full h-full object-cover"
            />
            <button
              aria-label="Play video"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="none"
                className="w-8 h-8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v18l15-9L5 3z" />
              </svg>
            </button>
          </div>
          <div className="mt-4 px-4">
            <h1 className="text-3xl font-extrabold text-blue-600 leading-tight">
              HTML, CSS
            </h1>
            <p className="text-lg text-blue-600 font-semibold bg-blue-400 inline-block rounded px-2 -mt-1">
              từ zero đến
            </p>
            <p className="text-2xl text-blue-600 font-semibold mt-1">
              &lt;hero&gt;
            </p>
            <p className="text-orange-500 font-mono mt-2">
              Fullstack.edu.vn
            </p>
          </div>
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

      <AskQuestionSidebar
        isOpen={isAskQuestionSidebarOpen}
        onClose={() => setIsAskQuestionSidebarOpen(false)}
      />

      {isAddNotePanelOpen && (
        <InlineAddNotePanel
          timestamp={"00:00"}
          onSave={handleAddNoteSave}
          onCancel={handleAddNoteCancel}
          onClose={() => setIsAddNotePanelOpen(false)}
        />
      )}
    </div>
  );
};

export default LessonDetailPageV2;
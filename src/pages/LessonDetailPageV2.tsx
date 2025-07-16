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
import AskQuestionSidebar from "@/components/lesson/AskQuestionSidebar"; // Import the new AskQuestionSidebar
import UpcomingLiveButton from "@/components/common/UpcomingLiveButton"; // Import the new button
import { allLessons, chapters } from "@/data/courseData"; // Import allLessons and chapters from central data file

const LessonDetailPageV2 = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentTourStepIndex, setCurrentTourStepIndex] = useState(0);
  const [isNotesSidebarOpen, setIsNotesSidebarOpen] = useState(false);
  const [isAskQuestionSidebarOpen, setIsAskQuestionSidebarOpen] = useState(false); // New state for ask question sidebar

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
        onNotesClick={() => setIsNotesSidebarOpen(true)}
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

          <FloatingAskQuestionButton onClick={() => setIsAskQuestionSidebarOpen(true)} />
        </div>

        {isSidebarOpen && (
          <div className="lg:w-1/3 bg-white border-l border-gray-200 p-6 overflow-y-auto h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Nội dung khóa học</h2>
              <UpcomingLiveButton chaptersData={chapters} />
            </div>
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
    </div>
  );
};

export default LessonDetailPageV2;
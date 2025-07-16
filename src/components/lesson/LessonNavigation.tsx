"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LessonNavigationProps {
  prevLessonId?: string;
  nextLessonId?: string;
  isSidebarOpen: boolean; // New prop to indicate sidebar state
  onToggleSidebar: () => void; // New prop for toggling sidebar
  toggleSidebarButtonId?: string; // New prop for the button ID
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({
  prevLessonId,
  nextLessonId,
  isSidebarOpen,
  onToggleSidebar,
  toggleSidebarButtonId,
}) => {
  return (
    <div className="bg-white shadow-md py-4 px-6 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200">
      <div className="flex space-x-2 mb-4 sm:mb-0">
        <Button
          variant="outline"
          className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full px-4 py-2"
          disabled={!prevLessonId}
          asChild={!!prevLessonId}
        >
          {prevLessonId ? (
            <Link to={`/lesson-v2/${prevLessonId}`}>
              <ChevronLeft size={16} className="mr-2" />
              Bài trước
            </Link>
          ) : (
            <>
              <ChevronLeft size={16} className="mr-2" />
              Bài trước
            </>
          )}
        </Button>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2"
          disabled={!nextLessonId}
          asChild={!!nextLessonId}
        >
          {nextLessonId ? (
            <Link to={`/lesson-v2/${nextLessonId}`}>
              Bài tiếp theo
              <ChevronRight size={16} className="ml-2" />
            </Link>
          ) : (
            <>
              Bài tiếp theo
              <ChevronRight size={16} className="ml-2" />
            </>
          )}
        </Button>
      </div>

      {/* New button for toggling sidebar */}
      <Button
        id={toggleSidebarButtonId} // Apply ID here
        variant="ghost"
        size="icon"
        className="text-gray-600 hover:bg-gray-100"
        onClick={onToggleSidebar}
      >
        {isSidebarOpen ? (
          <ChevronRight size={24} /> // Icon to close sidebar
        ) : (
          <ChevronLeft size={24} /> // Icon to open sidebar
        )}
      </Button>
    </div>
  );
};

export default LessonNavigation;
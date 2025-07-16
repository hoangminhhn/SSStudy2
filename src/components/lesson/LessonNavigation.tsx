"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus, MessageCircle } from "lucide-react";

interface LessonNavigationProps {
  prevLessonId?: string;
  nextLessonId?: string;
  onAddNote?: () => void;
  onAskQuestion?: () => void;
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({
  prevLessonId,
  nextLessonId,
  onAddNote,
  onAskQuestion,
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
            <Link to={`/lesson/${prevLessonId}`}>
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
            <Link to={`/lesson/${nextLessonId}`}>
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

      <div className="flex space-x-4">
        <Button
          variant="outline"
          className="text-gray-700 border-gray-300 hover:bg-gray-100 rounded-full px-4 py-2"
          onClick={onAddNote}
        >
          <Plus size={16} className="mr-2" />
          Thêm ghi chú tại 00:00
        </Button>
        <Button
          variant="outline"
          className="text-orange-600 border-orange-600 hover:bg-orange-50 rounded-full px-4 py-2"
          onClick={onAskQuestion}
        >
          <MessageCircle size={16} className="mr-2" />
          Hỏi đáp
        </Button>
      </div>
    </div>
  );
};

export default LessonNavigation;
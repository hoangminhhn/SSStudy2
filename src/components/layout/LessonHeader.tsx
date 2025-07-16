"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, BookOpen, HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface LessonHeaderProps {
  courseTitle: string;
  progressValue: number;
  currentLessonCount: number;
  totalLessonCount: number;
  onHelpClick?: () => void; // New prop
}

const LessonHeader: React.FC<LessonHeaderProps> = ({
  courseTitle,
  progressValue,
  currentLessonCount,
  totalLessonCount,
  onHelpClick,
}) => {
  return (
    <header className="bg-gray-800 text-white py-3 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center text-gray-300 hover:text-white transition-colors">
          <ChevronLeft size={20} className="mr-2" />
          <span className="font-semibold text-lg">SSStudy</span>
        </Link>
        <span className="text-lg font-medium hidden md:block">{courseTitle}</span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{progressValue}%</span>
          <span className="text-sm text-gray-300">{currentLessonCount}/{totalLessonCount} bài học</span>
          <Progress value={progressValue} className="w-24 h-2 bg-gray-600" indicatorClassName="bg-green-500" />
        </div>
        <Button variant="ghost" className="text-gray-300 hover:text-white px-2">
          <BookOpen size={18} className="mr-2" />
          Ghi chú
        </Button>
        <Button
          id="tour-help-button" // Add ID here
          variant="ghost"
          className="text-gray-300 hover:text-white px-2"
          onClick={onHelpClick} // Call the prop function
        >
          <HelpCircle size={18} className="mr-2" />
          Hướng dẫn
        </Button>
      </div>
    </header>
  );
};

export default LessonHeader;
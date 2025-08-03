"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, MonitorPlay, Download, Edit, AlertTriangle } from "lucide-react";

interface LessonHeroProps {
  lessonTitle: string;
  teacherName: string;
  viewsRemaining: number;
}

const LessonHero: React.FC<LessonHeroProps> = ({
  lessonTitle,
  teacherName,
  viewsRemaining,
}) => {
  return (
    <Card className="p-6 shadow-lg rounded-lg flex flex-col">
      {/* Video Player Placeholder */}
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-6">
        <img
          src="/images/20250630150800-ugrw2nuezq.png" // Updated image path
          alt="Video Thumbnail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <MonitorPlay size={64} className="text-white opacity-75" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {lessonTitle}
      </h1>

      <div className="flex items-center text-gray-700 mb-2 space-x-2">
        <User size={18} className="text-gray-600" />
        <span className="font-semibold">{teacherName}</span>
      </div>

      <div className="flex items-center text-orange-600 font-semibold mb-4 space-x-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="none"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
        <span>Bạn còn <span className="text-orange-700">{viewsRemaining}</span> lượt xem</span>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-0">
        <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full px-4 py-2">
          <Download size={16} className="mr-2" />
          Tải đề (không đáp án)
        </Button>
        <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-full px-4 py-2">
          <Download size={16} className="mr-2" />
          Tải đề (có đáp án)
        </Button>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3">
          Làm bài tập <Edit size={16} className="ml-2" />
        </Button>
        <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50 rounded-full px-6 py-3">
          Báo lỗi <AlertTriangle size={16} className="ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default LessonHero;
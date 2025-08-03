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

      <div className="flex items-center text-gray-700 mb-4">
        <User size={18} className="text-gray-600 mr-2" />
        <span className="font-semibold">{teacherName}</span>
        <span className="ml-4 text-sm text-gray-500">
          Bạn còn <span className="font-bold text-orange-600">{viewsRemaining}</span> lượt xem
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-4">
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